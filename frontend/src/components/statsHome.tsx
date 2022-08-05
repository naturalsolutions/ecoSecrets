import { Grid,  Typography } from "@mui/material";
import { useMainContext } from "../contexts/mainContext";


const StatsHome = () => {
    const {globalStats} = useMainContext();
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h2" gutterBottom >
                    Mes statistiques
                </Typography>
            </Grid>
            
            <Grid 
                container
                direction ='row' 
                justifyContent='center' 
                alignItems='center'
            >

                {globalStats && Object.entries(globalStats).map(([key, value]) => 
                    <Grid item xs={3} key={key}>
                        <Grid 
                            container 
                            direction ='column' 
                            justifyContent='center' 
                            alignItems='center'
                        >
                            <Grid item >
                                <Typography gutterBottom variant = "h2">
                                    {JSON.stringify(value)}
                                </Typography>   
                            </Grid>
                            <Grid item >
                                <Typography gutterBottom variant = "h4">
                                    {key}
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}
export default StatsHome;