import { Button, Grid,  Typography } from "@mui/material";
import { useMainContext } from "../contexts/mainContext";


const StatsHome = () => {
    const {globalStats} = useMainContext();
    const buttonLabels = {"medias": "Nombre de médias", "annotations": "Nombre d'annotations", "device":"Nombre de dispositifs", "sites": "Nombre de sites"};
    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant="h4" gutterBottom >
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
                                <Typography gutterBottom variant = "h2" sx={{display: {color: "#BCAAA4"}}}>
                                    {JSON.stringify(value)}
                                </Typography>   
                            </Grid>
                            <Grid item >
                                <Button 
                                    variant="outlined"
                                    style={{color: "#2FA37C", borderColor:"#2FA37C" }}
                                >
                                    {buttonLabels[key]}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Grid>
        </Grid>
    )
}
export default StatsHome;