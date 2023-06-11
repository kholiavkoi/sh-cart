import { useState } from "react";
import { useQuery } from "react-query";

// Components
import Drawer from '@mui/material/Drawer';
import { Grid } from "@mui/material";
import LinearProgress from '@mui/material/LinearProgress';
import Item from './Item/Item'

// Styles
import { Wrapper } from "./App.styles";

// Types
export type CartItemType = {
	id: number
	category: string
	description: string
	image: string
	price: number
	title: string
	amount: number
}

const getProducts = async (): Promise<CartItemType[]> => {
	return await (await fetch('https://fakestoreapi.com/products')).json()
}

function App() {
	const { data, isLoading, error } = useQuery<CartItemType[]>('products', getProducts)

	console.log(data)
	const getTotalItems = () => null
	const handleAddToCart = (clickedItem: CartItemType) => null
	const handleRemoveFromCart = () => null

	if (isLoading) return <LinearProgress />
	if (error) return <div>Something went wrong...</div>
	return (
		<Wrapper>
			<Grid container spacing={3}>
				{data?.map(item => (
					<Grid item key={item.id} xs={12} sm={4}>
						<Item item={item} handleAddToCart={handleAddToCart} />
					</Grid>
				))}
			</Grid>
		</Wrapper>
	)
}

export default App
