import { capitalize } from "@mui/material";
import { t } from "i18next";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { Annotation, FilesService, MetadataData } from "../client";
import { useMainContext } from "./mainContext";
import { useFilesContext } from "./filesContext";

export const AnnotationContext = createContext({} as any);

export const useAnnotationContext = () => useContext(AnnotationContext);

export function AnnotationContextProvider({ children }) {

    let params = useParams();

    const { projects, setCurrentDeployment, setCurrentProject } = 
    useMainContext();
    const { image, updateListFile, currentImage, setCurrentImage, files } =
    useFilesContext();
    const [observations, setObservations] = useState<Annotation[]>([]);
    const [metadata, setMetadata] = useState<MetadataData>();
    const [annotated, setAnnotated] = useState<undefined | boolean>(undefined);
    const [treated, setTreated] = useState<undefined | boolean>(undefined);
    const [isMinimalObservation, setIsMinimalObservation] = useState(
      observations?.length == 0
    );
    const [checked, setChecked] = useState<boolean>(observations?.length !== 0);
    const [openSaveErrorDialog, setOpenSaveErrorDialog] = useState({state: false, text: ""});
    const [gridView, setGridView] = useState(0); // 0: unique media, 1: grid
    const [selectedMedias, setSelectedMedias] = useState<any[]>([]);
    const [annotationButtonDisabled, setAnnotationButtonDisabled] = useState(false);

    const [idGroup, setIdGroup] = useState<string>("");
    const [modifiedObservationGroup, setModifiedObservationGroup] = useState<Annotation[]>([]);
    const [openAnnotationGroupModale, setOpenAnnotationGroupModale] = useState(false);
    const [selectedGroupedObservation, setSelectedGroupedObservation] = useState<string[]>([]);
    const [unselectedGroupedObservation, setUnselectedGroupedObservation] = useState<string[]>([]);
    const [confirmedSave, setConfirmedSave] = useState(true);

    const fieldsMandatory = useMemo(() => (["species", "genus", "family", "order", "classe"]), []);
    const observationTemplate = useMemo(() => ({ id: "", id_annotation: "", id_group: "", classe: "", order: "", family: "", genus: "", species: "", life_stage: "", biological_state: "", comments: "", behaviour: "", sex: "", number: 0 }), []);

    const handleCloseSaveErrorDialog = () => {
        setOpenSaveErrorDialog({state: false, text: ""});
    };

    const updateUrl = (id) => {
        const url = new URL(window.location.toString());
        url.pathname = `/project/${Number(params.projectId)}/deployment/${Number(params.deploymentId)}/medias/${id}`;
        window.history.pushState({}, "", url);
    };

    const previous = () => {
        files.forEach((f, i) => {
            if (f.id === currentImage) {
                let ind = i === 0 ? (i = files.length) : i;
                setCurrentImage(files[ind - 1].id);

                updateUrl(files[ind - 1].id);
            }
        });
    };

    const next = () => {
        files.forEach((f, i) => {
            if (f.id === currentImage) {
                let ind = i === files.length - 1 ? -1 : i;
                setCurrentImage(files[ind + 1].id);
                updateUrl(files[ind + 1].id);
            }
        });
    };

    const lastOrFirstImage = (indice) => {
        if (indice == 'first') {
            setCurrentImage(files[0].id);
            updateUrl(files[0].id);
        }
        if (indice == 'last') {
            setCurrentImage(files[files.length - 1].id);
            updateUrl(files[files.length - 1].id);
        }
    };

    const save = (selectedGroupedObservation: string[] = [], unselectedGroupedObservation: string[] = []) => {
        if (!gridView) {
            // Some modified observations are related to a group.
            // The user must select the ones whose values will be applied to all members of the group.
            // The unselected observations will only be modified for the current media,
            // and the observation will be individualized for this media, separate from the group.
            if(!confirmedSave) {
                console.log("Pas de confirmation de sauvegarde")
                if(modifiedObservationGroup.length > 0) {
                    setOpenAnnotationGroupModale(true);
                };
            };

            // None of the modified observations are related to a group,
            // or the IDs have been selected by the user.
            // In this case, saving is allowed.
            if(confirmedSave) {
                saveforamedia();
            };
        };

        if(gridView && selectedMedias.length > 0) {
            selectedMedias.map((item) => {
                FilesService
                .updateAnnotationsFilesAnnotationFileIdPatch(item.id, { annotations: { annotations:  observations, id_group: idGroup }} )
                .then(res => {
                    updateListFile();
                })
                .catch((err) => {
                    console.log("Error during annotation saving.");
                    console.log(err);
                });
            });
            setObservations([]);
        };

        if (gridView && selectedMedias.length === 0) {
            setOpenSaveErrorDialog({state: true, text: capitalize(t("annotations.cannot_save_no_media_selected"))});
        };
    };

    const saveforamedia = () => {
        let annotationData = {
            annotations: observations,
            id_group: idGroup,
            group_observations_id_to_update: selectedGroupedObservation, 
            group_observations_id_to_individualize: unselectedGroupedObservation
        };
        
        FilesService
            .updateAnnotationsFilesAnnotationFileIdPatch(currentImage, {
              annotations: annotationData,
            })
            .then(res => {
                updateListFile();
                updateConfirmedSave(false);
            })
            .catch((err) => {
                console.log("Error during annotation saving.");
                console.log(err);
            });
    };

    const saveandnext = () => {
        if (isMinimalObservation) {
            save(selectedGroupedObservation, unselectedGroupedObservation);
            if (!gridView && confirmedSave) {
                next();
            };
            if (gridView) {
                setSelectedMedias([]);
            };
        };
        if (!isMinimalObservation) {
            setOpenSaveErrorDialog({state: true, text: capitalize(t("annotations.cannot_save_species"))});
        };
    };

    const updateConfirmedSave = (bool: boolean) => {
        setConfirmedSave(bool);
    };

    useEffect(() => {
        if (confirmedSave) {
            saveforamedia();
            next();
        }
    }, [confirmedSave]);

    const handleAddObservation = () => {
        if (isMinimalObservation) {
            observationTemplate.id = uuidv4();
            setObservations([...observations, {...observationTemplate, id_group: idGroup}]);
        };
        if (checked) {
            setChecked(false);
        };
        setIsMinimalObservation(false);
    };

    const handleDeleteObservation = (id: string) => {
        let i = observations && observations.findIndex((obs) => obs.id === id);
        let tmp_obs = [...observations]
        i !== -1 && tmp_obs.splice(i, 1);
        i !== -1 && setObservations(tmp_obs);
        i === observations.length - 1 && setIsMinimalObservation(true);
    };

    const handleCheckChange = () => {
        if (!checked) {
            setObservations([]);
            setIsMinimalObservation(true);
        };
        if (checked) {
            setObservations([...observations, observationTemplate]);
            setIsMinimalObservation(false);
        };
        setChecked(!checked);
    };

    const handleFormChange = (id: string, params: string, value: string) => {
        let tmp_obs = [...observations]

        tmp_obs.forEach(ob => {
            if (ob.id === id) {

                ob[params] = value;
                if (fieldsMandatory.includes(params) 
                    && ob[params] && 
                    ob["number"] === 0) {
                        setIsMinimalObservation(true);
                        ob["number"] = 1;
                };

                if (ob["id_group"] && params !== "comments" && !modifiedObservationGroup.map(observation => observation.id).includes(id)) {
                    setModifiedObservationGroup([...modifiedObservationGroup, ob])
                    setConfirmedSave(false);
                };
            }
        })
        setObservations(tmp_obs);
    };

    useEffect(() => {
        (async () => {
            setCurrentDeployment(Number(params.deploymentId));
            setCurrentImage(params.imageId);
            setCurrentProject(Number(params.projectId));
        })();
    }, [projects]);

    useEffect(() => {
        (async () => {
            if (!gridView) {
                image() && setObservations(image().annotations);
                image() && setTreated(image().treated);
                image() && setMetadata({ ...metadata, date: image().date });
            }
        })();
    }, [files, currentImage]);

    useEffect(() => {
        (async () => {
            setChecked(observations?.length === 0);
        })();
    }, [observations]);

    useEffect(() => {
        let fieldToCheck: string[] = [];
        for (var i = 0; i < observations?.length; i++) {
            for (const property in observations[i]) { 
                if (fieldsMandatory.includes(property)) {
                    fieldToCheck.push(observations[i][property])
                }
            }
        };
        const result = fieldToCheck.some(element => {
            if (element !== '') {
                return true
            } else {
                return false
            }
        });
        setAnnotated(result)
    }, [handleCheckChange]);
    
    return(
        <AnnotationContext.Provider 
            value={{
                observations, setObservations,
                annotated, setAnnotated,
                treated, setTreated,
                isMinimalObservation, setIsMinimalObservation,
                checked, setChecked,
                openSaveErrorDialog, setOpenSaveErrorDialog,
                gridView, setGridView,
                selectedMedias, setSelectedMedias,
                openAnnotationGroupModale, setOpenAnnotationGroupModale,
                annotationButtonDisabled, setAnnotationButtonDisabled,
                confirmedSave, setConfirmedSave, updateConfirmedSave,
                modifiedObservationGroup, setModifiedObservationGroup,
                selectedGroupedObservation, setSelectedGroupedObservation,
                unselectedGroupedObservation, setUnselectedGroupedObservation,
                metadata, setMetadata, 
                handleCloseSaveErrorDialog,
                updateUrl,
                previous,
                lastOrFirstImage,
                next,
                save,
                saveandnext,
                handleAddObservation,
                handleDeleteObservation,
                handleCheckChange,
                handleFormChange
            }}
        >
            {children}
        </AnnotationContext.Provider>
    );
}

export default AnnotationContextProvider;
