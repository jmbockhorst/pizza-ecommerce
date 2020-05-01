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

am4core.useTheme(am4themes_animated);

function App() {
    const [orders, setOrders] = React.useState([]);

    React.useEffect(() => {
        loadOrders();
    }, []);

    React.useEffect(() => {
        const toppingsData = { pepperoni: 0, sausage: 0, ham: 0 };
        const dayData = [0, 0, 0, 0, 0, 0, 0];

        orders.forEach(order => {
            order.pizza_toppings.split(',').forEach(topping => {
                if (topping) {
                    toppingsData[topping]++;
                }
            });

            dayData[new Date(order.order_created_time).getDay()]++;
        });

        const toppingsChart = am4core.create("toppingsChart", am4charts.PieChart);

        toppingsChart.data = [
            {
                "topping": "pepperoni",
                "count": toppingsData.pepperoni
            },
            {
                "topping": "sausage",
                "count": toppingsData.sausage
            },
            {
                "topping": "ham",
                "count": toppingsData.ham
            }
        ];

        const pieSeries = toppingsChart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "count";
        pieSeries.dataFields.category = "topping";

        const daysChart = am4core.create("daysChart", am4charts.XYChart);

        daysChart.data = [
            {
                "day": "Sunday",
                "count": dayData[0]
            },
            {
                "day": "Monday",
                "count": dayData[1]
            },
            {
                "day": "Tuesday",
                "count": dayData[2]
            },
            {
                "day": "Wednesday",
                "count": dayData[3]
            },
            {
                "day": "Thursday",
                "count": dayData[4]
            },
            {
                "day": "Friday",
                "count": dayData[5]
            },
            {
                "day": "Saturday",
                "count": dayData[6]
            }
        ]

        const categoryAxis = daysChart.xAxes.push(new am4charts.CategoryAxis());
        categoryAxis.dataFields.category = "day";
        categoryAxis.title.text = "Day of the Week";

        const valueAxis = daysChart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.title.text = "Orders";

        const columnSeries = daysChart.series.push(new am4charts.ColumnSeries());
        columnSeries.dataFields.valueY = "count";
        columnSeries.dataFields.categoryX = "day";
        columnSeries.name = "Orders";
        columnSeries.tooltipText = "{name}: [bold]{valueY}[/]";

        daysChart.cursor = new am4charts.XYCursor();

        return () => {
            toppingsChart.dispose();
            daysChart.dispose();
        }
    }, [orders]);

    function loadOrders() {
        axios.get('orders.php').then(response => {
            setOrders(response.data);
        });
    }


    return (
        <div>
            <Typography variant="h3" align="center">Toppings chart</Typography>
            <div id="toppingsChart"></div>

            <Typography variant="h3" align="center">Orders by day of the week</Typography>
            <div id="daysChart" style={{ height: '300px' }}></div>

        </div>
    );
}

ReactDOM.render(<App />, document.getElementById("root"));