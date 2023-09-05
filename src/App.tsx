import { BrowserRouter } from "react-router-dom";
import { ConfigAppProvider } from "./state/configApp/configAppContext";
import { LangProvider } from "./state/lang/langContext";
import MoviesRouter from "./routes";
import { MoviesProvider } from "./state/movies/moviesContext";


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
