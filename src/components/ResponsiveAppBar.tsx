import { FormControl, FormControlLabel, FormGroup, IconButton, Select, SelectChangeEvent, useTheme } from "@mui/material";
import { useConfigAppContext } from "../state/configApp/configAppContext";
import { useLangContext } from "../state/lang/langContext";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { grey, red } from '@mui/material/colors';
import { SwitchMode } from "./switchMode.component";
import SearchIcon from '@mui/icons-material/Search';
import { SearchBar, StyledInputBase } from "./SearchBar.component";
import { useMoviesContext } from "../state/movies/moviesContext";
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { KeyboardEvent, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

const ResponsiveAppBar = () => {

    const theme = useTheme()
    const { setLang, lang: currentLang, w } = useLangContext()
    const { toggleTheme, typeTheme } = useConfigAppContext()
    const { isSearching, startSearching, stopSearching } = useMoviesContext()
    const [patternToSearch, setPatternToSearch] = useState('')


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleTheme()
    };

    const handleChangeSearcher = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPatternToSearch(event.target.value)

    };

    const handleSearcherEnter = (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {

        if (patternToSearch.length > 0) {
            if (event.key === "Enter") {
                startSearching(patternToSearch)
            }
        }

    };





    const langs = ['ENG', 'ESP',];

    const handleCloseLangs = (event: SelectChangeEvent) => {
        setLang(event.target.value === 'ENG' ? 'ENG' : 'ESP');
    };


    return (
        <AppBar position="fixed" sx={{ background: theme.palette.mode === 'light' ? red[900] : grey[900] }}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>



                    <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'space-around' }}>
                        <SearchBar sx={{
                            display: 'flex',
                            alignItems: 'center',
                            pl: 1,

                        }}>

                            <MovieFilterIcon />

                            <StyledInputBase
                                placeholder={w('search')}
                                onChange={handleChangeSearcher}
                                onKeyUp={handleSearcherEnter}
                                value={patternToSearch}

                            />

                            {isSearching ?
                                (<IconButton onClick={() => {
                                    stopSearching()
                                    setPatternToSearch('')
                                }}><CloseIcon /> </IconButton>) :
                                (patternToSearch.length > 0 && (<IconButton onClick={() => {
                                    startSearching(patternToSearch)
                                }}><SearchIcon /></IconButton>))}


                        </SearchBar>
                    </Box>

                    <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
                        <FormGroup>
                            <FormControlLabel
                                control={<SwitchMode sx={{ m: 1 }}
                                    checked={typeTheme === 'D'}
                                    onChange={handleChange} />}
                                label=''
                            />
                        </FormGroup>



                        <FormControl>
                            <Select
                                variant="standard"
                                value={currentLang}
                                onChange={handleCloseLangs}
                                sx={{
                                    color: theme.palette.common.white,
                                    borderBottom: 'transparent !important',
                                    '::before, :hover, :focus, ::after': {
                                        borderBottom: 'transparent !important',

                                    },
                                    '& svg': {
                                        color: theme.palette.common.white
                                    },
                                    '& .MuiInputBase-input': {
                                        marginTop: '4px',
                                        backgroundColor: 'transparent',
                                        ':focus': {
                                            backgroundColor: 'transparent'
                                        }
                                    }

                                }}
                            >

                                {langs.map((lang) => (
                                    <MenuItem value={lang} key={lang}>
                                        <img src={`/projects/movies_react/img/${lang.toLowerCase()}.png`} width='26px' />
                                    </MenuItem>
                                ))}

                            </Select>
                        </FormControl>



                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default ResponsiveAppBar;