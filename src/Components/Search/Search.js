import React, {useContext, useEffect, useState} from 'react';
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import SearchService from "../../api/SearchService";
import {SearchContext} from "../../Context/SearchContext";
import ProductCard from "../Commons/ProductCard";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Pagination from "@mui/material/Pagination";

const Search = () => {
    // Context
    const search = useContext(SearchContext);

    // States
    const [products, setProducts] = useState([]);

    useEffect(() => {
        search.refresh();

        if (search.by.get === "subcategory") {
            SearchService.searchBySubCategory({
                keyword: search.keyword.get,
                pageNumber: search.page.get
            })
                .then(data => {
                    setProducts(data.products);
                    search.total.set(data.pages);
                    search.page.set(data.page);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (search.by.get === "category") {
            SearchService.searchByCategory({
                keyword: search.keyword.get,
                pageNumber: search.page.get
            })
                .then(data => {
                    setProducts(data.products);
                    search.total.set(data.pages);
                    search.page.set(data.page);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (search.by.get === "query") {
            SearchService.searchByQuery({
                keyword: search.keyword.get,
                pageNumber: search.page.get
            })
                .then(data => {
                    setProducts(data.products);
                    search.total.set(data.pages);
                    search.page.set(data.page);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }, [search.keyword.get, search.page.get]);


    return (
        <Container>
            <Typography
                variant="h5"
                sx={{
                    textTransform: 'capitalize'
                }}
                gutterBottom
            >
                {
                    search.by.get === "query" ? (
                        <>
                            <>Showing results for</>
                            <i>{" " + search.keyword.get}</i>
                        </>
                    ) : (search.keyword.get)
                }
            </Typography>
            <Divider sx={{mb: 1}}/>
            <Stack
                direction="row"
                sx={{
                    alignItem: 'center',
                    justifyContent: 'center',
                    flexGrow: 1
                }}
            >
                <Grid container spacing={2}>
                    {
                        products &&
                        products.map((product, idx) =>
                            <Grid item sm={2.4}>
                                <ProductCard key={idx} product={product}/>
                            </Grid>
                        )}
                </Grid>
            </Stack>
            <Stack
                direction="row"
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    mt: 4
                }}
            >
                <Pagination
                    count={search.total.get}
                    page={search.page.get}
                    onChange={(event, value) => {
                        search.page.set(value);
                        search.params.set({
                            page: value
                        });
                    }}
                />
            </Stack>
        </Container>
    );
};

export default Search;
