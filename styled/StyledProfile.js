import styled from "styled-components";

export const StyledModalProfileView = styled.div`
  background: #ffffffb2;
  box-shadow: -8px 8px 16px 0 #4594f70d;
  border-radius: 8px;
  padding: 58px;
  backdrop-filter: blur(24px);
  .profile {
    &-top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      @media screen and (max-width: 1023px) {
        flex-direction: column;
      }
      &-left {
        display: flex;
        align-items: center;
        gap: 32px;
        @media screen and (max-width: 1023px) {
          gap: 10px;
        }
        &-profile {
          width: 176px;
          height: 176px;
          img {
            width: 100%;
          }
          @media screen and (max-width: 1023px) {
            width: 94px;
            height: 94px;
          }
        }
        &-info {
          display: flex;
          flex-direction: column;
          gap: 24px;
          &-name {
            display: flex;
            align-items: center;
            justify-content: space-between;
            button {
              border: 1px solid #4594f7;
              padding: 8px 12px;
              border-radius: 4px;
              color: #000000;
              background-color: #ffffff;
              cursor: pointer;
            }
          }
          h3,
          p {
            font-size: 32px;
            font-style: normal;
            font-weight: 500;
            line-height: 48px;
            letter-spacing: 0;
            text-align: left;
            color: #373f51;
            @media screen and (max-width: 1023px) {
              font-size: 22px;
              line-height: 32px;
            }
          }
          @media screen and (max-width: 1023px) {
            p {
              font-size: 16px;
            }
          }
          &-share {
            display: flex;
            align-items: center;
            gap: 14px;
            button {
              border: 1px solid transparent;
              background: transparent;
              cursor: pointer;
              border-radius: 12px;
              display: flex;
              align-items: center;
              justify-content: center;
              padding: 8px;
              transition: all ease 0.2s;
              &:hover {
                box-shadow: 0 0 10px 0 #373f5155;
              }
            }
            @media screen and (max-width: 1023px) {
              img {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
      }
      &-right {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        gap: 4px;
        @media screen and (max-width: 1023px) {
          text-align: center;
          margin-top: 48px;
          gap: 8px;
        }
        h3 {
          font-size: 28px;
          font-style: normal;
          font-weight: 400;
          line-height: 42px;
          letter-spacing: 0;
          color: #373f51;
          @media screen and (max-width: 1023px) {
            font-size: 16px;
            line-height: 24px;
          }
        }
        h4 {
          font-size: 58px;
          font-style: normal;
          font-weight: 600;
          line-height: 87px;
          letter-spacing: 0;
          color: #373f51;
          @media screen and (max-width: 1023px) {
            font-size: 28px;
            line-height: 42px;
          }
        }
        &-profit {
          display: flex;
          gap: 8px;

          p {
            font-size: 28px;
            font-style: normal;
            font-weight: 400;
            line-height: 42px;
            letter-spacing: 0;
            color: #44c615;

            @media screen and (max-width: 1023px) {
              font-size: 16px;
              line-height: 24px;
            }
          }
          span {
            font-size: 28px;
            font-style: normal;
            font-weight: 400;
            line-height: 42px;
            letter-spacing: 0;
            color: #373f51;
            @media screen and (max-width: 1023px) {
              font-size: 16px;
              line-height: 24px;
            }
          }
        }
      }
    }
    &-chart-section {
      margin-top: 34px;
      display: flex;
      justify-content: space-between;
      gap: 34px;

      @media screen and (max-width: 1023px) {
        flex-direction: column-reverse;
      }

      &-left {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 8px;
        overflow-y: auto;
        @media screen and (max-width: 1023px) {
          max-height: unset;
        }
        .property {
          display: flex;
          justify-content: space-between;
          border: 1px solid #4594f733;
          box-shadow: -8px 8px 16px 0 #4594f70d;
          border-radius: 8px;
          padding: 12px 32px;
          @media screen and (max-width: 1023px) {
            padding: 8px;
          }
          &:first-child {
            margin-bottom: 20px;
          }
          .coin {
            display: flex;
            align-items: center;
            gap: 4px;
            &-img {
              width: 42px;
              height: 42px;
              @media screen and (max-width: 1023px) {
                width: 24px;
                height: 24px;
                img,
                svg {
                  width: 24px;
                  height: 24px;
                }
              }
            }
            p {
              font-size: 28px;
              font-style: normal;
              font-weight: 400;
              line-height: 42px;
              letter-spacing: 0;
              text-align: left;
              color: #373f51;
              margin-top: 2px;
              @media screen and (max-width: 1023px) {
                font-size: 16px;
              }
            }
          }
          h4 {
            font-size: 28px;
            font-style: normal;
            font-weight: 600;
            line-height: 42px;
            letter-spacing: 0;
            text-align: left;
            color: #373f51;
            @media screen and (max-width: 1023px) {
              font-size: 14px;
            }
          }
          h5 {
            font-size: 28px;
            font-style: normal;
            font-weight: 300;
            line-height: 42px;
            letter-spacing: 0;
            text-align: left;
            color: #373f51;
            @media screen and (max-width: 1023px) {
              font-size: 16px;
            }
          }
        }
      }
      &-right {
        display: flex;
        flex-direction: column;
        border: 1px solid #4594f733;
        border-radius: 8px;
        box-shadow: -8px 8px 16px 0 #4594f70d;
        h3 {
          padding: 16px;
          background: #4594f708;
          font-size: 32px;
          font-style: normal;
          font-weight: 600;
          line-height: 48px;
          letter-spacing: 0;
          text-align: left;
          color: #373f51;
          @media screen and (max-width: 1023px) {
            font-size: 20px;
            line-height: 21px;
            padding: 8px;
          }
        }
        &-chart {
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
    &-nft-stacking-section {
      margin-top: 48px;
      display: flex;
      justify-content: space-between;
      gap: 52px;
      @media screen and (max-width: 1023px) {
        flex-direction: column;
      }
      h4 {
        padding: 16px 32px;
        background: #4594f708;
        font-size: 32px;
        font-style: normal;
        font-weight: 600;
        line-height: 48px;
        letter-spacing: 0;
        text-align: left;
        color: #373f51;
        @media screen and (max-width: 1023px) {
          padding: 8px;
          font-size: 20px;
          line-height: 24px;
        }
      }
      &-left,
      &-right {
        flex: 1;
        border: 1px solid #4594f733;
        border-radius: 8px;
        box-shadow: -8px 8px 16px 0 #4594f70d;
        h5 {
          padding-left: 30px;
          padding-right: 30px;
          @media screen and (max-width: 1023px) {
            padding-left: 8px;
            padding-right: 8px;
          }
          font-size: 28px;
          font-style: normal;
          font-weight: 500;
          line-height: 42px;
          letter-spacing: 0;
          text-align: left;
          color: #373f51;
          margin-bottom: 24px;
          @media screen and (max-width: 1023px) {
            font-size: 20px;
            line-height: 24px;
          }
        }
      }
      &-left {
        &-body {
          position: relative;
          padding: 12px 0 12px 0;
          @media screen and (max-width: 1023px) {
            padding: 8px 0 12px 0;
          }
          a {
            display: block;
            text-align: center;
            bottom: 0;
            color: #4594f7;
            font-weight: 300;
            font-size: 24px;
            @media screen and (max-width: 1023px) {
              font-size: 18px;
            }
            padding: 6px;
            @media screen and (max-width: 1023px) {
              padding: 6px;
            }
          }
        }
      }
      &-right {
        button {
          align-self: center;
          margin-left: 8px;
          border: none;
          padding: 8px 12px;
          color: ${({ theme }) => (theme.isDark ? "#fff" : "#fff")};
          background: ${({ theme }) =>
            theme.isDark ? "#040F39B2" : "#040F39B2"};
          border-radius: 12px;
          cursor: pointer;
          font-size: 20px;
          @media screen and (max-width: 1023px) {
            font-size: 14px;
          }
        }
        &-body {
          display: flex;
          flex-direction: column;
          &-item {
            display: flex;
            align-items: center;
            justify-content: space-between;

            p {
              font-size: 28px;
              color: ${({ theme }) => (theme.isDark ? "#fff" : "#373f51")};
              @media screen and (max-width: 1023px) {
                font-size: 18px;
              }
            }
          }
          padding: 12px 30px;
          @media screen and (max-width: 1023px) {
            padding: 8px;
          }
        }
      }
    }
    &-activity {
      margin-top: 56px;
      display: flex;
      flex-direction: column;
      &-top {
        display: flex;
        gap: 4px;
        margin-bottom: 16px;
        align-items: center;
        h4 {
          font-size: 32px;
          font-style: normal;
          font-weight: 600;
          line-height: 48px;
          letter-spacing: 0;
          text-align: left;
          color: #373f51;
          @media screen and (max-width: 1023px) {
            font-size: 20px;
            line-height: 24px;
          }
        }
      }
      table {
        flex: 1;
        border: 1px solid #4594f733;
        border-radius: 8px;
        box-shadow: -8px 8px 16px 0 #4594f70d;
        thead {
          text-align: left;
          background: #4594f708;
          tr {
            th {
              padding: 16px;
              font-size: 28px;
              font-style: normal;
              font-weight: 500;
              line-height: 42px;
              letter-spacing: 0;
              text-align: left;
              color: #373f51;
              @media screen and (max-width: 1023px) {
                padding: 8px;
                font-size: 14px;
                line-height: 20px;
              }
            }
          }
        }
        tbody {
          tr {
            td {
              padding: 16px;
              font-size: 28px;
              font-style: normal;
              font-weight: 300;
              line-height: 42px;
              letter-spacing: 0;
              text-align: left;
              color: #373f51;
              @media screen and (max-width: 1023px) {
                padding: 8px;
                font-size: 14px;
                line-height: 20px;
              }
            }
            &:not(:last-child) {
              border-bottom: 1px solid #4594f733;
            }
          }
        }
      }
    }
    &-collections {
      flex: 1;
      border: 1px solid #4594f733;
      border-radius: 8px;
      box-shadow: -8px 8px 16px 0 #4594f70d;

      h3 {
        padding: 16px 32px;
        background: #4594f708;
        font-size: 32px;
        font-style: normal;
        font-weight: 600;
        line-height: 48px;
        letter-spacing: 0;
        width: 100%;
        text-align: center;
        color: #373f51;
        @media screen and (max-width: 1023px) {
          padding: 8px;
          font-size: 20px;
          line-height: 24px;
        }
      }
    }
  }

  @media screen and (max-width: 1023px) {
    padding: 16px;
  }
`;
