import React from 'react';
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";

const Contact = () => {
    return (
        <>
            <Container maxWidth="md">
                <Paper sx={{p: 2, m: 1}}>
                    <Typography variant="h4" gutterBottom>Contact Us</Typography>
                    <Divider/>
                    <Grid container spacing={2} mt={1} mb={3}>
                        <Grid item sm={4}>
                            <Card sx={{maxWidth: 345}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Aman Gangwar
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={'https://www.linkedin.com/in/aman-gangwar-33a13a142/'}>
                                        <IconButton size="small">
                                            <LinkedInIcon/>
                                        </IconButton>
                                    </Link>
                                    <Link href={'https://github.com/MyGit465'}>
                                        <IconButton size="small">
                                            <GitHubIcon/>
                                        </IconButton>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card sx={{maxWidth: 345}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Anant Gehi
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={'https://www.linkedin.com/in/anant-g-59003b130/'}>
                                        <IconButton size="small">
                                            <LinkedInIcon/>
                                        </IconButton>
                                    </Link>
                                    <Link href={'https://github.com/anantgehi'}>
                                        <IconButton size="small">
                                            <GitHubIcon/>
                                        </IconButton>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card sx={{maxWidth: 345}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Deepanshu Rautela
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={'https://www.linkedin.com/in/deepanshu99/'}>
                                        <IconButton size="small">
                                            <LinkedInIcon/>
                                        </IconButton>
                                    </Link>
                                    <Link href={'https://github.com/deeprat'}>
                                        <IconButton size="small">
                                            <GitHubIcon/>
                                        </IconButton>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card sx={{maxWidth: 345}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Akshay Deopurkar
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={'https://www.linkedin.com/in/akshay-deopurkar-10015b191/'}>
                                        <IconButton size="small">
                                            <LinkedInIcon/>
                                        </IconButton>
                                    </Link>
                                    <Link href={'https://github.com/AkshayDeopurkar'}>
                                        <IconButton size="small">
                                            <GitHubIcon/>
                                        </IconButton>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card sx={{maxWidth: 345}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Roshan Rane
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={'https://www.linkedin.com/in/roshanrane/'}>
                                        <IconButton size="small">
                                            <LinkedInIcon/>
                                        </IconButton>
                                    </Link>
                                    <Link href={'https://github.com/roshanrane24'}>
                                        <IconButton size="small">
                                            <GitHubIcon/>
                                        </IconButton>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                        <Grid item sm={4}>
                            <Card sx={{maxWidth: 345}}>
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Vinit Sawant
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link href={'https://www.linkedin.com/in/vinit-sawant-85661b222/'}>
                                        <IconButton size="small">
                                            <LinkedInIcon/>
                                        </IconButton>
                                    </Link>
                                    <Link href={'https://github.com/SawantVinit22'}>
                                        <IconButton size="small">
                                            <GitHubIcon/>
                                        </IconButton>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    </Grid>
                    <Divider> Source Code </Divider>
                    <Stack
                        direction="row"
                        sx={{justifyContent: 'space-around', alignItems: 'center'}}
                    >
                        <Typography gutterBottom variant="subtitle1" component="div">
                            <Link href={'https://github.com/anantgehi/ecommerce-backend'}>
                                BackEnd
                            </Link>
                        </Typography>
                        <Typography gutterBottom variant="subtitle1" component="div">
                            <Link href={'https://github.com/roshanrane24/ecommerce-frontend'}>
                                FrontEnd
                            </Link>
                        </Typography>
                    </Stack>
                </Paper>
            </Container>
        </>
    )
        ;
};

export default Contact;
