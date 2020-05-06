const {
    Typography,
    TextField,
    Paper,
    Button,
    Select,
    MenuItem,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    CircularProgress,
    RadioGroup,
    Radio,
    Fade
} = MaterialUI;

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function App() {
    /** @type {[boolean, (showCreateAccount: boolean) => void]} */
    const [showCreateAccount, setShowCreateAccount] = React.useState(false);

    /** @type {[string, (username: string) => void]} */
    const [username, setUsername] = React.useState('');

    /** @type {[string, (password: string) => void]} */
    const [password, setPassword] = React.useState('');

    /** @type {[string, (password2: string) => void]} */
    const [password2, setPassword2] = React.useState('');

    /** @type {[string, (error: string) => void]} */
    const [error, setError] = React.useState('');

    /** @type {[string, (successMessage: string) => void]} */
    const [successMessage, setSuccessMessage] = React.useState('');


    React.useEffect(() => {
        handleRedirect();
    }, []);

    async function handleLogin() {
        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        const response = await axios.post("tryLogin.php", data);

        if (response.data === "success") {
            document.cookie = `username=${username}`;
            handleRedirect();
        } else {
            setError("Invalid username/password combination");
        }
    }

    function handleRedirect() {
        const username = getCookie('username');

        if (!username) {
            return;
        }

        axios.get('users.php').then(response => {
            const users = response.data;
            const user = users.find(user => user.username === username);

            if (parseInt(user?.employee)) {
                window.location.href = 'orders.html';
            } else {
                window.location.href = 'orderPizza.html';
            }
        });
    }

    function showCreateAccountPage(show) {
        setUsername('');
        setPassword('');
        setError('');
        setSuccessMessage('');
        setShowCreateAccount(show);
    }

    async function handleCreateAccount() {
        if (username === '') {
            setError('Username cannot be empty');
            return;
        }

        if (password === '') {
            setError('Password cannot be empty');
            return;
        }

        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }

        const data = new FormData();
        data.append('username', username);
        data.append('password', password);
        await axios.post("createUser.php", data);

        showCreateAccountPage(false);
        setSuccessMessage("Account created successfully");
    }

    const styles = {
        margin: {
            marginBottom: '20px',
        },
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <Paper style={{ width: '60%', margin: '0 auto', padding: '20px' }}>
                <Fade in={!showCreateAccount} unmountOnExit timeout={{ enter: 600, exit: 0 }}>
                    <div>
                        <Typography variant="h2" align="center" style={styles.margin}>Login</Typography>
                        <div style={{ width: '50%', margin: '10px auto' }}>
                            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth style={styles.margin} />
                            <TextField label="Password" value={password} onChange={e => setPassword(e.target.value)} type="password" fullWidth style={styles.margin} />
                            <Button variant="contained" fullWidth onClick={handleLogin}>Login</Button>
                            <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>
                            <Typography variant="body1" style={{ color: 'green' }}>{successMessage}</Typography>
                        </div>

                        <Button variant="contained" onClick={() => showCreateAccountPage(true)} style={{ marginTop: '40px' }}>Create account</Button>
                    </div>
                </Fade>
                <Fade in={showCreateAccount} unmountOnExit timeout={{ enter: 600, exit: 0 }}>
                    <div>
                        <Typography variant="h2" align="center" style={styles.margin}>Create Account</Typography>
                        <Button variant="contained" onClick={() => showCreateAccountPage(false)} style={{ float: 'left' }}>Back</Button>
                        <div style={{ width: '50%', margin: '10px auto' }}>
                            <TextField label="Username" value={username} onChange={e => setUsername(e.target.value)} fullWidth style={styles.margin} />
                            <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} fullWidth style={styles.margin} />
                            <TextField label="Password again" type="password" value={password2} onChange={e => setPassword2(e.target.value)} fullWidth style={styles.margin} />
                            <Button variant="contained" onClick={handleCreateAccount}>Create account</Button>
                            <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>
                        </div>
                    </div>
                </Fade>
            </Paper>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));