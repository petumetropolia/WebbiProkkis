CREATE TABLE `wop_user` (
  `user_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `surname` text NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `filename` text NOT NULL,
  `role` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO `wop_user` (`user_id`, `name`, `surname`, `email`, `password`, `filename`, `role`) VALUES
(1, 'Kim', "Rautiainen", "kim.rautiainen@metropolia.fi", "1234", 'http://placekitten.com/400/300', 1),
(2, 'Petteri', "Helttula", "petteri.helttula@metropolia.fi", "qwert", 'http://placekitten.com/400/302', 1),
(3, 'Emil', "Lehtonen", "emil.lehtonen@metropolia.fi", "asdf", 'http://placekitten.com/400/304', 1);


ALTER TABLE `wop_user`
  ADD PRIMARY KEY (`user_id`);

ALTER TABLE `wop_user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
