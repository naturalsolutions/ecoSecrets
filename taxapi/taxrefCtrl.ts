import {
    GET,
    JSONRESPONSE,
    root,
    PARAMETER,
  } from "./tapis";
  import express from "express";
  import fs from "fs";
  
  const taxonSch = {
    type: "object",
    properties: {
      REGNE: { type: "string" },
      PHYLUM: { type: "string" },
      CLASSE: { type: "string" },
      ORDRE: { type: "string" },
      FAMILLE: { type: "string" },
      SOUS_FAMILLE: { type: "string" },
      TRIBU: { type: "string" },
      GROUP1_INPN: { type: "string" },
      GROUP2_INPN: { type: "string" },
      CD_NOM: { type: "string" },
      CD_TAXSUP: { type: "string" },
      CD_SUP: { type: "string" },
      CD_REF: { type: "string" },
      RANG: { type: "string" },
      LB_NOM: { type: "string" },
      LB_AUTEUR: { type: "string" },
      NOM_COMPLET: { type: "string" },
      NOM_COMPLET_HTML: { type: "string" },
      NOM_VALIDE: { type: "string" },
      NOM_VERN: { type: "string" },
      NOM_VERN_ENG: { type: "string" },
      HABITAT: { type: "string" },
      FR: { type: "string" },
      GF: { type: "string" },
      MAR: { type: "string" },
      GUA: { type: "string" },
      SM: { type: "string" },
      SB: { type: "string" },
      SPM: { type: "string" },
      MAY: { type: "string" },
      EPA: { type: "string" },
      REU: { type: "string" },
      SA: { type: "string" },
      TA: { type: "string" },
      TAAF: { type: "string" },
      PF: { type: "string" },
      NC: { type: "string" },
      WF: { type: "string" },
      CLI: { type: "string" },
      URL: { type: "string" },
      description: { type: "string" },
      media: { type: "array", items: { type: "string" } },
    },
    required: [
      "REGNE",
      "PHYLUM",
      "CLASSE",
      "ORDRE",
      "FAMILLE",
      "SOUS_FAMILLE",
      "TRIBU",
      "GROUP1_INPN",
      "GROUP2_INPN",
      "CD_NOM",
      "CD_TAXSUP",
      "CD_SUP",
      "CD_REF",
      "RANG",
      "LB_NOM",
      "LB_AUTEUR",
      "NOM_COMPLET",
      "NOM_COMPLET_HTML",
      "NOM_VALIDE",
      "NOM_VERN",
      "NOM_VERN_ENG",
      "HABITAT",
      "FR",
      "GF",
      "MAR",
      "GUA",
      "SM",
      "SB",
      "SPM",
      "MAY",
      "EPA",
      "REU",
      "SA",
      "TA",
      "TAAF",
      "PF",
      "NC",
      "WF",
      "CLI",
      "URL",
    ],
  };
  
  const listTaxonSch = {
    type: "array",
    items: taxonSch,
  };
  
  root("taxapi/V1");
  
  const data = JSON.parse(fs.readFileSync("TAXREFv14.json", "utf-8"));
  
  class Ctrl {
    @GET("regnes")
    async regnes(req: express.Request, res: express.Response) {
      let result = [...new Set(data.map((e: any) => e["REGNE"]))];
      res.status(200).send(result);
    }
  
    @GET("phylums")
    async phylums(req: express.Request, res: express.Response) {
      let result = [...new Set(data.map((e: any) => e["PHYLUM"]))];
      res.status(200).send(result);
    }
  
    @GET("classes")
    async classes(req: express.Request, res: express.Response) {
      let result = [...new Set(data.map((e: any) => e["CLASSE"]))];
      res.status(200).send(result);
    }
  
    @GET("ordres")
    async ordres(req: express.Request, res: express.Response) {
      let result = [...new Set(data.map((e: any) => e["ORDRE"]))];
      res.status(200).send(result);
    }
  
    @GET("familles")
    async familles(req: express.Request, res: express.Response) {
      let result = [...new Set(data.map((e: any) => e["FAMILLE"]))];res.status(200).send(result);
    }
  
    @GET("groupe1")
    async groupe1(req: express.Request, res: express.Response) {
      let result = [...new Set(data.map((e: any) => e["GROUP1_INPN"]))];res.status(200).send(result);
    }
  
    @GET("groupe2")
    async groupe2(req: express.Request, res: express.Response) {
      let result = [...new Set(data.map((e: any) => e["GROUP2_INPN"]))];res.status(200).send(result);
    }
  
    @GET("taxons")
    @JSONRESPONSE("200", "Refresh token for new User", listTaxonSch)
    @PARAMETER({
      name: "NOM_COMPLET",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "NOM_VERN",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "LB_NOM",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "REGNE",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "CLASSE",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "ORDRE",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "FAMILLE",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "GENRE",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "GROUP1_INPN",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "GROUP2_INPN",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "CD_NOM",
      schema: { type: "string" },
      in: "query",
      required: false,
    })
    @PARAMETER({
      name: "desc_media",
      schema: { type: "boolean" },
      in: "query",
      required: false,
    })
    async taxons(req: express.Request, res: express.Response) {
      let result = data.filter((e: any) => {
        let res: any = true;
        if (req.query["NOM_COMPLET"] && req.query["NOM_COMPLET"] !== "")
          res =
            res &
            e["NOM_COMPLET"]
              ?.toLowerCase()
              .includes(req.query["NOM_COMPLET"].toString().toLowerCase());
        if (req.query["NOM_VERN"] && req.query["NOM_VERN"] !== "")
          res =
            res &
            e["NOM_VERN"]
              ?.toLowerCase()
              .includes(req.query["NOM_VERN"].toString().toLowerCase());
        if (req.query["LB_NOM"] && req.query["LB_NOM"] !== "")
          res =
            res &
            e["LB_NOM"]
              ?.toLowerCase()
              .includes(req.query["LB_NOM"].toString().toLowerCase());
        if (req.query["REGNE"] && req.query["REGNE"] !== "")
          res =
            res &
            e["REGNE"]
              ?.toLowerCase()
              .includes(req.query["REGNE"].toString().toLowerCase());
        if (req.query["CLASSE"] && req.query["CLASSE"] !== "")
          res =
            res &
            e["CLASSE"]
              ?.toLowerCase()
              .includes(req.query["CLASSE"].toString().toLowerCase());
        if (req.query["ORDRE"] && req.query["ORDRE"] !== "")
          res =
            res &
            e["ORDRE"]
              ?.toLowerCase()
              .includes(req.query["ORDRE"].toString().toLowerCase());
        if (req.query["FAMILLE"] && req.query["FAMILLE"] !== "")
          res =
            res &
            e["FAMILLE"]
              ?.toLowerCase()
              .includes(req.query["FAMILLE"].toString().toLowerCase());
        if (req.query["GENRE"] && req.query["GENRE"] !== "")
          res =
            res &
            e["GENRE"]
              ?.toLowerCase()
              .includes(req.query["GENRE"].toString().toLowerCase());
        if (req.query["GROUP1_INPN"] && req.query["GROUP1_INPN"] !== "")
          res =
            res &
            e["GROUP1_INPN"]
              ?.toLowerCase()
              .includes(req.query["GROUP1_INPN"].toString().toLowerCase());
        if (req.query["GROUP2_INPN"] && req.query["GROUP2_INPN"] !== "")
          res =
            res &
            e["GROUP2_INPN"]
              ?.toLowerCase()
              .includes(req.query["GROUP2_INPN"].toString().toLowerCase());
        if (req.query["RANG"] && req.query["RANG"] !== "")
          res =
            res &
              e["RANG"]
              ?.toLowerCase()
              .startsWith(req.query["RANG"].toString().toLowerCase()) &
              e["RANG"]
              ?.toLowerCase()
              .endsWith(req.query["RANG"].toString().toLowerCase());
        if (req.query["CD_NOM"] && req.query["CD_NOM"] !== "")
          res = res & e["CD_NOM"]?.toLowerCase().includes(req.query["CD_NOM"]);
        return res;
      });
  
      res.status(200).send(result.slice(0, 25000));
    }
  }
  
  const ctrl = new Ctrl();
  
  export default ctrl;
  