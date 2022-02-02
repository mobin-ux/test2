const FavoriteIcon = ({ active, onClick }) => {
  const src = `/img/${active ? "star-yellow.svg" : "star-empty.svg"}`;
  return (
    <img className="cursor-pointer" onClick={onClick} src={src} alt="star" />
  );
};

FavoriteIcon.defaultProps = {
  onClick: () => undefined,
};

export { FavoriteIcon };
