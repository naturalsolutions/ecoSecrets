import { Button, Card, CardActionArea, CardActions, CardContent, Grid, Stack, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';


// [
// {'key': 'Médias', 
// 'value': 9050},
// {'key': 'Mes sites',
// 'value': 12},
// ...
// ]


const stats = {
    'medias': 9050,
    'sites': 15,
    'dispositifs': 35,
    'annotations': 650
}
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

const Stats = () => {
    return (
        <Grid 
            container spacing={2}
            direction="row"
        >
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom >
                    Mes statistiques
                </Typography>
            </Grid>

            <Grid container xs={3} direction ='column' justifyContent='center' alignItems='center'>
                <Grid item >
                    <Typography gutterBottom variant = "h2">
                        {stats.medias}
                    </Typography>   
                </Grid>
                <Grid item >
                    <Typography gutterBottom variant = "h4">
                        Voir les médias
                    </Typography>
                </Grid>
            </Grid>
            
            <Grid container xs={3} direction ='column' justifyContent='center' alignItems='center'>
                <Grid item >
                    <Typography gutterBottom variant = "h2">
                        {stats.sites}
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography gutterBottom variant = "h4">
                        Sites
                    </Typography>
                </Grid>
            </Grid>
            
            <Grid container xs={3} direction ='column' justifyContent='center' alignItems='center'>
                <Grid item >
                    <Typography gutterBottom variant = "h2">
                        {stats.dispositifs}
                    </Typography>   
                </Grid>
                <Grid item >
                    <Typography gutterBottom variant = "h4">
                        Dispositifs
                    </Typography>
                </Grid>
            </Grid>
           <Grid container xs={3} direction ='column' justifyContent='center' alignItems='center'>
                <Grid item >
                    <Typography gutterBottom variant = "h2">
                        {stats.annotations}
                    </Typography>
                </Grid>
                <Grid item >
                    <Typography gutterBottom variant = "h4">
                        Annotations
                    </Typography>
                </Grid>

            </Grid>
           
      </Grid>
    )
}
    export default Stats;