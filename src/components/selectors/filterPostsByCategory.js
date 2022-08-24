function filterPostsByCategory(posts, category) {
  if (category === 'Accueil') {
    return posts;
  }
  return posts.filter(
    (post) => post.category === category,
  );
}

export default filterPostsByCategory;
