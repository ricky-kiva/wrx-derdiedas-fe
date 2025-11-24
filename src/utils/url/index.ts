export const syncUrlParams = (page: number, limit: number) => {
  const params = new URLSearchParams(window.location.search);

  params.set('page', String(page));
  params.set('limit', String(limit));

  const newUrl = `${window.location.pathname}?${params.toString()}`;

  window.history.pushState({}, '', newUrl);
};
