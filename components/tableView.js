import { useEffect, useState } from "react";
import moment from "moment";
export default function TableView({ data }) {
	const [state, setState] = useState({
		data: [],
	});
	useEffect(() => {
		console.log(data, Date.parse(new Date()), "fetch data");
		let mainData = [];
		if (data) {
			data.orders.map((o) => {
				o.date = moment(o.arrives_at_utc).format("dddd, L");
				o.time = moment(o.arrives_at_utc).format("LT");
				if (o.arrives_at_utc < Date.parse(new Date())) {
					o.status = "Delivered";
				}
				if (o.arrives_at_utc >= Date.parse(new Date())) {
					o.status = "Confirmed";
				}
				if (!o.arrives_at_utc) {
					o.status = "Cancelled";
				}

				mainData.push({ ...o });
			});

			setState({ data: mainData });
			console.log(mainData, "main data return");
		}
	}, [data]);

	const checkColor = (status) => {
		switch (status) {
			case "Confirmed":
				return "green";
			case "Delivered":
				return "#EBF13A";
			case "Cancelled":
				return "red";
		}
	};

	return (
		<div>
			<table style={{ width: "100%" }}>
				<tbody>
					<tr>
						<th className="table-title">Status</th>
						<th className="table-title">Date</th>
						<th className="table-title">Time</th>
						<th className="table-title">Order Number</th>
						<th className="table-title">Total</th>
					</tr>
					{state.data?.map((o, key) => {
						return (
							<tr key={key}>
								<td style={{ color: checkColor(o.status) }}>{o.status}</td>
								<td>{o.date}</td>
								<td style={{ fontWeight: "bold" }}>{o.time}</td>
								<td style={{ color: "lightgray" }}>#{o.order_id}</td>
								<td>RM {o.total_paid}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}
