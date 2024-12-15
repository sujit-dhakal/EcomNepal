from sklearn.neighbors import NearestNeighbors
from sklearn.preprocessing import StandardScaler
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
from .models import Product

def get_product_features(products):
    """Extract features for KNN from products."""
    # Extract tags using TF-IDF
    tag_vectorizer = TfidfVectorizer()
    tags_list = [' '.join(product.tags.names()) for product in products]
    tags_matrix = tag_vectorizer.fit_transform(tags_list).toarray()

    # Extract numerical features: price and stock
    numerical_features = np.array([[product.price, product.stock] for product in products])

    # Standardize numerical features
    scaler = StandardScaler()
    standardized_numerical_features = scaler.fit_transform(numerical_features)

    # Combine features
    combined_features = np.hstack([tags_matrix, standardized_numerical_features])
    return combined_features

def get_related_products_knn(target_product_id, n_neighbors=5, similarity_threshold=0.8):
    """Find related products using KNN."""
    # Fetch all products
    products = list(Product.objects.all())

    # If no products or only one product exists, return empty
    if len(products) <= 1:
        return []

    # Create product feature matrix
    product_features = get_product_features(products)

    # Adjust `n_neighbors` if necessary
    n_neighbors = min(n_neighbors, len(products) - 1)

    # Fit KNN model
    knn = NearestNeighbors(n_neighbors=n_neighbors + 1, metric='cosine')
    knn.fit(product_features)

    # Find the target product index
    target_index = next((i for i, p in enumerate(products) if p.id == target_product_id), None)
    if target_index is None:
        return []

    # Find neighbors
    distances, indices = knn.kneighbors([product_features[target_index]])

    # Filter related products based on threshold
    related_products = [
        products[i] for i, dist in zip(indices[0], distances[0])
        if products[i].id != target_product_id and dist <= similarity_threshold
    ]
    return related_products
