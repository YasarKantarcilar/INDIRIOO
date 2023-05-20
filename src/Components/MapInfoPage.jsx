import { Container, Typography } from "@mui/material";
import React from "react";
import Navbar from "./Layout/Navbar";
import Image from "mui-image";
import MapInfoImage from "../Assets/MapInfo.jpg";

function MapInfoPage() {
  return (
    <div>
      <Navbar />
      <Container sx={{ marginTop: "100px" }}>
        <Typography variant="h5">
          İŞLETME LAN LON ALMAK İÇİN, WEB TARAYICINIZDAN GOOGLE MAPS'E GIRMENIZ
          GEREKMEKTEDIR. İŞLETMENİZİ HARİTADAN BULUP TAM USTUNE FARENIN SAG
          TUSUYLA TIKLAYINCA ACILAN PENCEREDEN EN USTTEKI SAYI FORMATINDAKI YERE
          TIKLAYARAK KOPYALAMANIZ GEREKMEKTEDIR, KOPYALADIGINIZ SAYIYI ILGILI
          YERE YAPISTIRARAK RESTORAN BASVURU ALANINA BILGILERINIZI GIRMEYE DEVAM
          EDEBILIRSINIZ
        </Typography>
        <Image src={MapInfoImage} />
      </Container>
    </div>
  );
}

export default MapInfoPage;
