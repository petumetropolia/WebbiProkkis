CREATE TABLE `Työntekijä`
(
  `tyontekija_id` INT NOT NULL,
  `etunimi` INT NOT NULL,
  `sukunimi` INT NOT NULL,
  `s-Posti` INT NOT NULL,
  `kuvaus` INT NOT NULL,
  PRIMARY KEY (`tyontekija_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `Työntekijä`
  MODIFY `tyontekija_id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE `Työnantaja`
(
  `y-tunnus` INT NOT NULL,
  `nimi` INT NOT NULL,
  `kuvaus` INT NOT NULL,
  `sähköposti` INT NOT NULL,
  PRIMARY KEY (`Y-tunnus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Ammatti`
(
  `ammatti_id` INT NOT NULL,
  `nimike` INT NOT NULL,
  PRIMARY KEY (`ammatti_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `Ammatti`
  MODIFY `ammatti_id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE `MEDIA`
(
  `media_id` INT NOT NULL,
  `tiedostonimi` INT NOT NULL,
  `tyontekija_id` INT NOT NULL,
  `y-tunnus` INT NOT NULL,
  PRIMARY KEY (`media_id`),
  FOREIGN KEY (`tyontekija_id`) REFERENCES `Työntekijä`(`tyontekija_id`),
  FOREIGN KEY (`y-tunnus`) REFERENCES `Työnantaja`(`y-tunnus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `MEDIA`
  MODIFY `media_id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE `Pyyhkäsy`
(
  `pyyhkäsySuunta-TT` INT NOT NULL,
  `pyyhkäsySuunta-TA` INT NOT NULL,
  `timestamp` INT NOT NULL,
  `tyontekija_id` INT NOT NULL,
  `y-tunnus` INT NOT NULL,
  PRIMARY KEY (`tyontekija_id`, `y-tunnus`),
  FOREIGN KEY (`tyontekija_id`) REFERENCES `Työntekijä`(`tyontekija_id`),
  FOREIGN KEY (`y-tunnus`) REFERENCES `Työnantaja`(`y-tunnus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `onAmmattia`
(
  `ammatti_id` INT NOT NULL,
  `tyontekija_id` INT NOT NULL,
  PRIMARY KEY (`ammatti_id`, `tyontekija_id`),
  FOREIGN KEY (`ammatti_id`) REFERENCES `Ammatti`(`ammatti_id`),
  FOREIGN KEY (`tyontekija_id`) REFERENCES `Työntekijä`(`tyontekija_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `EtsiiAmmattilaista`
(
  `ammatti_id` INT NOT NULL,
  `y-tunnus` INT NOT NULL,
  PRIMARY KEY (`ammatti_id`, `y-tunnus`),
  FOREIGN KEY (`ammatti_id`) REFERENCES `Ammatti`(`ammatti_id`),
  FOREIGN KEY (`y-tunnus`) REFERENCES `Työnantaja`(`y-tunnus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `Viesti`
(
  `aikaleima` INT NOT NULL,
  `otsake` INT NOT NULL,
  `sisalto` INT NOT NULL,
  `viesti_id` INT NOT NULL,
  `tyontekija_id` INT NOT NULL,
  `y-tunnus` INT NOT NULL,
  PRIMARY KEY (`viesti_id`),
  FOREIGN KEY (`tyontekija_id`) REFERENCES `Työntekijä`(`tyontekija_id`),
  FOREIGN KEY (`y-tunnus`) REFERENCES `Työnantaja`(`y-tunnus`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `Viesti`
  MODIFY `viesti_id` int(11) NOT NULL AUTO_INCREMENT;

CREATE TABLE `Vastaus`
(
  `aikaleima`INT NOT NULL,
  `sisalto` INT NOT NULL,
  `vastaa_id` INT NOT NULL,
  `viesti_id` INT NOT NULL,
  `tyontekija_id` INT NOT NULL,
  `y-tunnus` INT NOT NULL,
  PRIMARY KEY (`vastaa_id`),
  FOREIGN KEY (`viesti_id`) REFERENCES `Viesti`(`viesti_id`),
  FOREIGN KEY (`tyontekija_id`) REFERENCES `Työntekijä`(`tyontekija_id`),
  FOREIGN KEY (`y-tunnus`) REFERENCES `Työnantaja`(`y-tunnus`)
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `Vastaus`
  MODIFY `vastaa_id` int(11) NOT NULL AUTO_INCREMENT;