import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";

import ArrowIcon from "../static/svg/Arrow.svg";
import "./AccordeonContainer.css";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .0)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="app-container accordeon">
      <div className="title-wrapper">
        <button className="arrow-btn">
          <img src={ArrowIcon} alt="arrow" />
        </button>
        <h1 className="app-title">Личные данные</h1>
      </div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Collapsible Group Item #1</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Овуляцией называется промежуток времени, когда фолликул
            увеличивается в размерах, а из него выходит созревшая яйцеклетка.
            После освобождения она попадает в матку, где может оплодотвориться
            сперматозоидом. Можно сказать, что овуляция тесно связана с
            возможностью оплодотворения. Вот почему этот период так важен для
            женщин, планирующих беременность. Если яйцеклетка во время овуляции,
            которая длится в среднем сутки, контактирует со спермой, происходит
            оплодотворение и дальше развивается беременность. При отсутствии
            зачатия она теряет свою способность к жизни. Считается, что овуляция
            происходит за две недели до наступления следующей менструации. Для
            женщин, у которых 28-дневный менструальный цикл, она наступает на 14
            день от первого критического дня. В ситуациях, когда менструальный
            цикл длится меньше или больше или вовсе имеет разную
            продолжительность, рассчитать овуляцию будет сложнее. Если вы хотите
            зачать ребенка, должны знать о том, что вероятность оплодотворения
            существует на протяжении 5-6 дней каждого менструального цикла. И
            хотя после высвобождения яйцеклетка сохраняет жизнеспособность лишь
            24 часа, сперматозоиды могут быть активными в матке до 5 дней.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Collapsible Group Item #2</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Овуляцией называется промежуток времени, когда фолликул
            увеличивается в размерах, а из него выходит созревшая яйцеклетка.
            После освобождения она попадает в матку, где может оплодотвориться
            сперматозоидом. Можно сказать, что овуляция тесно связана с
            возможностью оплодотворения. Вот почему этот период так важен для
            женщин, планирующих беременность. Если яйцеклетка во время овуляции,
            которая длится в среднем сутки, контактирует со спермой, происходит
            оплодотворение и дальше развивается беременность. При отсутствии
            зачатия она теряет свою способность к жизни. Считается, что овуляция
            происходит за две недели до наступления следующей менструации. Для
            женщин, у которых 28-дневный менструальный цикл, она наступает на 14
            день от первого критического дня. В ситуациях, когда менструальный
            цикл длится меньше или больше или вовсе имеет разную
            продолжительность, рассчитать овуляцию будет сложнее. Если вы хотите
            зачать ребенка, должны знать о том, что вероятность оплодотворения
            существует на протяжении 5-6 дней каждого менструального цикла. И
            хотя после высвобождения яйцеклетка сохраняет жизнеспособность лишь
            24 часа, сперматозоиды могут быть активными в матке до 5 дней.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Collapsible Group Item #3</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Овуляцией называется промежуток времени, когда фолликул
            увеличивается в размерах, а из него выходит созревшая яйцеклетка.
            После освобождения она попадает в матку, где может оплодотвориться
            сперматозоидом. Можно сказать, что овуляция тесно связана с
            возможностью оплодотворения. Вот почему этот период так важен для
            женщин, планирующих беременность. Если яйцеклетка во время овуляции,
            которая длится в среднем сутки, контактирует со спермой, происходит
            оплодотворение и дальше развивается беременность. При отсутствии
            зачатия она теряет свою способность к жизни. Считается, что овуляция
            происходит за две недели до наступления следующей менструации. Для
            женщин, у которых 28-дневный менструальный цикл, она наступает на 14
            день от первого критического дня. В ситуациях, когда менструальный
            цикл длится меньше или больше или вовсе имеет разную
            продолжительность, рассчитать овуляцию будет сложнее. Если вы хотите
            зачать ребенка, должны знать о том, что вероятность оплодотворения
            существует на протяжении 5-6 дней каждого менструального цикла. И
            хотя после высвобождения яйцеклетка сохраняет жизнеспособность лишь
            24 часа, сперматозоиды могут быть активными в матке до 5 дней.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
