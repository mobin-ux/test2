import styled from "styled-components";
import css from "./browse-by-category.module.scss";
import { items } from "./data";

const ItemStyle = styled.div`
  background-image: url(${(props) => props.backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: ${(props) => (props.isLarg ? "586px" : "285px")};
  @media screen and (max-width: 768px) {
    height: 285px;
  }
  div {
    border-style: solid;
    border-color: rgb(255 255 255);
    border-top-width: 4px;
    backdrop-filter: blur(14px);
    background: rgba(255, 255, 255, 0.6);
  }
`;
const BrowseByCategory = ({ properties, categories }) => {
  return (
    <div
      className={`lg:pt-16 mb-64 mx-auto lg:mx-0 flex justify-center flex-col ${css.container}`}
    >
      <div className={`relative ${css.container}`}>
        <img
          src="/img/browse-by-category-line-yellow.png"
          className={`absolute z-10 top-0 ${css.yellowLine}`}
          alt=""
        />
        <img
          src="/img/browse-by-category-line-blue.png"
          className={`absolute z-10 ${css.blueLine} bottom-0`}
          alt=""
        />
        {categories.length > 0 && (
          <h2 className="text-payrue-black font-medium text-4xl text-center mb-12">
            Browse by category
          </h2>
        )}
        <div className="grid grid-rows-4 grid-cols-2 md:grid-rows-3 md:grid-cols-3 relative  gap-4 z-20">
          {items.map((el, idx) => (
            <div className={el?.class} key={idx}>
              <ItemStyle
                className="w-full flex items-end"
                backgroundImage={el.image}
                isLarg={el.isLarg}
              >
                <div className="w-full py-5 text-center text-payrue-home-blue font-semibold text-2xl ">
                  {el.title}
                </div>
              </ItemStyle>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { BrowseByCategory };
