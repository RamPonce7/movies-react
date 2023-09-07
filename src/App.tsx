import { BrowserRouter } from "react-router-dom";
import { ConfigAppProvider } from "./state/configApp";
import { LangProvider } from "./state/lang";
import { MoviesProvider } from "./state/movies";
import MoviesRouter from "./routes";

function App() {
  return (
    <BrowserRouter>
      <ConfigAppProvider>
        <LangProvider>
          <MoviesProvider>
            <MoviesRouter />
          </MoviesProvider>
        </LangProvider>
      </ConfigAppProvider>

    </BrowserRouter>
  );
}

export default App;
