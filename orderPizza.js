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
    /** @type {[string, (pizzaSize: string) => void]} */
    const [size, setSize] = React.useState('small');

    /** @type {[{[string]: boolean}, (toppings: {[string]: boolean}) => void]} */
    const [toppings, setToppings] = React.useState({});

    /** @type {[string, (sauce: string) => void]} */
    const [sauce, setSauce] = React.useState('normal');

    /** @type {[string, (pizzaSize: string) => void]} */
    const [cheese, setCheese] = React.useState('normal');

    /** @type {[boolean, (loading: boolean) => void]} */
    const [loading, setLoading] = React.useState(false);

    /** @type {[boolean, (orderCompleted: boolean) => void]} */
    const [orderCompleted, setOrderCompleted] = React.useState(false);

    /** @type {[number, (waitTime: number) => void]} */
    const [waitTime, setWaitTime] = React.useState(0);

    /** @type {[string, (username: string) => void]} */
    const [username, setUsername] = React.useState('');

    /** @type {[boolean, (showEmployee: boolean) => void]} */
    const [showEmployee, setShowEmployee] = React.useState(false);

    React.useEffect(async () => {
        const username = getCookie('username');

        if (!username) {
            return;
        }

        axios.get('users.php').then(response => {
            const users = response.data;

            const user = users.find(user => user.username === username);

            if (user) {
                setUsername(user.username);

                if (parseInt(user.employee)) {
                    setShowEmployee(true);
                }
            }
        });


    }, []);

    function addTopping(checked, topping) {
        setToppings({ ...toppings, [topping]: checked });
    }

    async function submitOrder() {
        setLoading(true);

        const toppingsList = Object.keys(toppings).filter(key => toppings[key]).join();

        const data = new FormData();
        data.append('size', size);
        data.append('toppings', toppingsList);
        data.append('sauce', sauce);
        data.append('cheese', cheese);

        const response = await axios.post('submitOrder.php', data);
        setWaitTime(parseInt(response.data));
        setLoading(false);

        setOrderCompleted(true);
        setSize('small');
        setToppings({});
        setSauce('normal')
        setCheese('normal');
    }

    const styles = {
        margin: {
            marginBottom: '20px',
        },
        optionItem: {
            margin: '0px auto',
            width: '250px',
            display: 'block',
            fontSize: '20px'
        },
        optionHeader: {
            marginTop: '20px',
            fontSize: '30px'
        }
    };

    const numToppings = Object.keys(toppings).filter(key => toppings[key]).length;

    const total = (size === 'small' ? 8 : size === 'medium' ? 12 : 16) + numToppings + (sauce === 'extra' ? 0.5 : 0) + (cheese === 'extra' ? 1 : 0);

    return (
        <div>
            <Paper style={{ width: '60%', margin: '0 auto', padding: '20px' }}>
                <Typography variant="body1" style={{ position: 'absolute' }}>{username}</Typography>
                {
                    showEmployee &&
                    <Button variant="contained" href='orders.html' style={{ position: 'absolute', top: '70px' }}>View orders</Button>
                }

                <Typography variant="h2" align="center" style={styles.margin}>Order Pizza</Typography>

                <Fade in={!orderCompleted} unmountOnExit>
                    <div>
                        <FormLabel align="center" style={styles.optionHeader} component="legend">Size</FormLabel>
                        <Select value={size} onChange={e => setSize(e.target.value)} style={styles.optionItem}>
                            <MenuItem value="small">Small (10 inch), $8.00</MenuItem>
                            <MenuItem value="medium">Medium (14 inch), $12.00</MenuItem>
                            <MenuItem value="large">Large (18 inch), $16.00</MenuItem>
                        </Select>

                        <FormLabel align="center" style={styles.optionHeader} component="legend">Toppings ($1.00 each)</FormLabel>
                        <FormGroup style={{ width: '250px', margin: '0px auto' }}>
                            <FormControlLabel
                                control={<Checkbox checked={toppings.pepperoni} onChange={e => addTopping(e.target.checked, 'pepperoni')} />}
                                label="Pepperoni" />
                            <FormControlLabel
                                control={<Checkbox checked={toppings.sausage} onChange={e => addTopping(e.target.checked, 'sausage')} />}
                                label="Sausage" />
                            <FormControlLabel
                                control={<Checkbox checked={toppings.ham} onChange={e => addTopping(e.target.checked, 'ham')} />}
                                label="Ham" />
                        </FormGroup>

                        <FormLabel component="legend" align="center" style={styles.optionHeader}>Sauce</FormLabel>
                        <RadioGroup value={sauce} onChange={e => setSauce(e.target.value)} style={{ width: '250px', margin: '0px auto' }}>
                            <FormControlLabel value="none" control={<Radio />} label="No Sauce" />
                            <FormControlLabel value="normal" control={<Radio />} label="Normal Sauce" />
                            <FormControlLabel value="extra" control={<Radio />} label="Extra Sauce (+ $0.50)" />
                        </RadioGroup>

                        <FormLabel component="legend" align="center" style={styles.optionHeader}>Cheese</FormLabel>
                        <RadioGroup value={cheese} onChange={e => setCheese(e.target.value)} style={{ width: '250px', margin: '0px auto' }}>
                            <FormControlLabel value="none" control={<Radio />} label="No Cheese" />
                            <FormControlLabel value="normal" control={<Radio />} label="Normal Cheese" />
                            <FormControlLabel value="extra" control={<Radio />} label="Extra Cheese (+ $1.00)" />
                        </RadioGroup>

                        <Typography variant="h5" align="center">Total: ${total.toFixed(2)}</Typography>

                        <Button variant="contained" onClick={submitOrder} style={{ ...styles.optionItem, marginTop: '20px' }}>Submit Order</Button>
                    </div>
                </Fade>
                <Fade in={orderCompleted} unmountOnExit>
                    <div>
                        <Typography variant="h5" align="center">Order completed successfully. Order will be ready in approx. {waitTime} minutes</Typography>
                        <Button variant="contained" onClick={() => setOrderCompleted(false)} style={{ ...styles.optionItem, marginTop: '20px' }}>Order again</Button>
                    </div>
                </Fade>
                {
                    loading &&
                    <CircularProgress style={{ display: 'block', margin: '20px auto' }}></CircularProgress>
                }
            </Paper>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));