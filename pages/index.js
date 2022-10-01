import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import TableView from "../components/tableView";
export default function Home({ data }) {
	return (
		<div className={styles.container}>
			<Head>
				<title>Create Next App</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			{data != "error" ? <TableView data={data} /> : "500 INTERNAL SERVER ERROR"}
		</div>
	);
}

export async function getServerSideProps() {
	// Pass data to the page via props
	let queryData;
	const data = await fetch("https://staging-api.dahmakan.com/test/orders")
		.then(async (response) => {
			const query = await response.json();
			queryData = query;
			console.log(query, "Query data");
		})
		.catch(async (error) => {
			console.log(error, "error messafge");
			queryData = "error";
		});

	return { props: { data: queryData } };
}
