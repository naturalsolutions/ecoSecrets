import { Grid, Typography } from '@mui/material';
import Dropzone from 'react-dropzone';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export default function DropzoneComponent(props) {
    return (
        <Dropzone
            // onDrop={loadFile} 
            maxFiles={1}
        >
            {({ getRootProps, getInputProps }) => (
                <section id="dropzone" style={{height: "240px"}}>
                    <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Grid 
                            container
                            direction="column"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <Grid item>
                                <CameraAltIcon 
                                    fontSize="large" 
                                    sx={{ height: "180px", width: "150px" }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography 
                                    variant="button"
                                    color="#757575"
                                >
                                    {props.sentence}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                </section>
            )}
        </Dropzone>
    );
}