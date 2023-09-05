import { FormControl, FormControlLabel, FormGroup, Select, SelectChangeEvent, useTheme } from "@mui/material";
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
import BackspaceIcon from '@mui/icons-material/Backspace';
import { CloseIconWrapper, SearchBar, SearchIconWrapper, StyledInputBase } from "./SearchBar.component";

const ResponsiveAppBar = () => {

    const theme = useTheme()
    const { w } = useLangContext()

    const { setLang, lang: currentLang } = useLangContext()
    const { toggleTheme, typeTheme } = useConfigAppContext()

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        toggleTheme()
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
                        <SearchBar>
                            <SearchIconWrapper>
                                <SearchIcon />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder={w('search')}

                            />
                            <CloseIconWrapper>
                                <BackspaceIcon />
                            </CloseIconWrapper>
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
                                        <img src={`/img/${lang.toLowerCase()}.png`} width='26px' />
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