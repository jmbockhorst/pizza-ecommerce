const {
    Typography,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} = MaterialUI;

function App() {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        loadOrders();
    }, []);

    function loadOrders() {
        axios.get('orders.php').then(response => {
            setOrders(response.data);
        });
    }

    const styles = {
        margin: {
            marginBottom: '20px',
        }
    };

    return (
        <div>
            <Paper style={{ width: '60%', margin: '0 auto', padding: '20px' }}>
                <Typography variant="h2" align="center" style={styles.margin}>Pizza Orders</Typography>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Order Id</TableCell>
                            <TableCell align="right">Size</TableCell>
                            <TableCell align="right">Toppings</TableCell>
                            <TableCell align="right">Sauce</TableCell>
                            <TableCell align="right">Cheese</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((row) => (
                            <TableRow key={row.order_id}>
                                <TableCell component="th" scope="row">
                                    {row.order_id}
                                </TableCell>
                                <TableCell align="right">{row.pizza_size}</TableCell>
                                <TableCell align="right">{row.pizza_toppings}</TableCell>
                                <TableCell align="right">{row.pizza_sauce}</TableCell>
                                <TableCell align="right">{row.pizza_cheese}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));