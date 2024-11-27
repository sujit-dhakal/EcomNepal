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
        self.products = list(products)
        product_texts = [
            f"{product.name} {product.tags} {product.description}" for product in self.products
        ]
        self.tfidf_matrix = self.vectorizer.fit_transform(product_texts)

    def search(self, query,product_id=None, num_results=5):
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
            idx = int(idx)
            if similarities[idx] > 0:
                product = self.products[idx]
                if product_id is not None and product.id == product_id:
                    continue
                results.append({
                    'product': product,
                    'similarity_score': float(similarities[idx])
                })

        return results