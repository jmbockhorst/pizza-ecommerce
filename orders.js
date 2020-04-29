const {
    Typography,
    TextField,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Checkbox
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

    /**
     * @param {number} orderId
     * @param {string} type 
     * @param {boolean} checked 
     */
    async function handleOrderChange(orderId, type, checked) {
        const data = new FormData();
        data.append('orderId', orderId);
        data.append('type', type);
        data.append('checked', checked);
        await axios.post("updateOrder.php", data);

        loadOrders();
    }

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
                            <TableCell align="center">Order ready</TableCell>
                            <TableCell align="center">Order delivered</TableCell>
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
                                <TableCell align="center">
                                    <Checkbox checked={!!row.order_ready_time} onChange={e => handleOrderChange(row.order_id, 'ready', e.target.checked)}></Checkbox>
                                </TableCell>
                                <TableCell align="center">
                                    <Checkbox checked={!!row.order_delivered_time} onChange={e => handleOrderChange(row.order_id, 'delivered', e.target.checked)}></Checkbox>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));