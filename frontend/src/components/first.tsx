import {FC, useEffect, useRef, useState} from "react"
import "./first.css"

import api from "../utils/api"

const First: FC<{}> = () => {

		const refInput = useRef<HTMLInputElement>(null);
		const [files, setFiles] = useState<any[]>([]);
		const updateListFile	= () => {
			api.get("files/").then(res => {
				setFiles(res.data)
			}).catch(err => {
				console.log(err)
			}) 
		}

		const Uint8ArrayToHexString = (ui8array: Uint8Array) => {
			var hexstring = '',
				h;
			for (var i = 0; i < ui8array.length; i++) {
				h = ui8array[i].toString(16);
				if (h.length === 1) {
					h = '0' + h;
				}
				hexstring += h;
			}
			var p = Math.pow(2, Math.ceil(Math.log2(hexstring.length)));
			hexstring = hexstring.padStart(p, '0');
			return hexstring;
		}

		const save = () => {
			if(refInput && refInput.current && refInput.current.files){
				const file = refInput.current.files[0]
				const reader = new FileReader()
				reader.readAsArrayBuffer(file)
				reader.onload = () => {
					const digest = crypto.subtle.digest("SHA-256", new Uint8Array(reader.result as ArrayBuffer))
					digest.then(res => {
						let result = new Uint8Array(res);
      			var hash = Uint8ArrayToHexString(result);
						api.postForm("files/upload/",{hash, file}, {headers:{"Content-Type": "multipart/form-data"}}).
								then(res => updateListFile()).
								catch(err => console.log(err))
					})
				}
			}
		}

		useEffect(() => {
			updateListFile()
		}, [])

    return (
		  <>
				<label htmlFor="avatar">Choose a profile picture:</label>
				<input type="file"
								id="avatar" name="avatar"
								ref={refInput}
								accept="image/png, image/jpeg" />
				<button onClick={save}>
					Sauvegarder
				</button>
				<ul>
					{files.map((e,i) => <li key={i}>{e.name}<img src={e.url} width="400px"/></li>)}
				</ul>
			</>
    )
}

export default First;