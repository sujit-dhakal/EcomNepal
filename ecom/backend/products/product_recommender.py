from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np


class ProductSearch:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(stop_words='english')
        self.tfidf_matrix = None
        self.products = []

    def fit(self, products):
        """Train the search engine with product data"""
        self.products = list(products)  # Convert QuerySet to list
        product_texts = [
            f"{product.name} {product.description}" for product in self.products
        ]
        self.tfidf_matrix = self.vectorizer.fit_transform(product_texts)

    def search(self, query, num_results=5):
        """Search for products similar to the query"""
        if not self.products:
            return []

        # Transform search query
        query_vector = self.vectorizer.transform([query])

        # Calculate similarity between query and all products
        similarities = cosine_similarity(query_vector, self.tfidf_matrix).flatten()

        # Get top matching products
        top_indices = np.argsort(similarities)[-num_results:][::-1]

        results = []
        for idx in top_indices:
            idx = int(idx)  # Convert numpy.int64 to Python int
            if similarities[idx] > 0:
                results.append({
                    'product': self.products[idx],
                    'similarity_score': float(similarities[idx])
                })

        return results
