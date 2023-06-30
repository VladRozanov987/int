import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Gelasio:wght@400;500;600&family=Roboto:wght@400;500;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    max-width: 1440px;
    width: 90%;
    margin: 0 auto;
    padding: 0 25px;
  }

  .d-flex {
    display: flex;
    justify-content: space-between;
  }
`;

export default GlobalStyle;
