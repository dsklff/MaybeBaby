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
  border: `none`,
  "&:not(:last-child)": {
    borderBottom: `1px solid ${theme.palette.divider}`,
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
    marginLeft: theme.spacing(0),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  borderBottom: `none`,
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
        <h1 className="app-title">Справочник</h1>
      </div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Что такое репродуктивный возраст?</Typography>
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
          <Typography>Как влияет индекс массы тела на фертильность?</Typography>
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
          <Typography>Как влияет курение на фертильность?</Typography>
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
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Что такое овуляция?</Typography>
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
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Что такое овариальный резерв?</Typography>
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
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
          <Typography>
            Виды контрацепции и степень защиты от нежелательной беременности
          </Typography>
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
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Что такое АМГ и за что он отвечает</Typography>
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
        expanded={expanded === "panel8"}
        onChange={handleChange("panel8")}
      >
        <AccordionSummary aria-controls="panel8d-content" id="panel8d-header">
          <Typography>
            Остальные гормоны: ЛГ, ФСГ, пролактин, ТТГ, тестостерон - влияние на
            фертильность
          </Typography>
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
        expanded={expanded === "panel9"}
        onChange={handleChange("panel9")}
      >
        <AccordionSummary aria-controls="panel9d-content" id="panel9d-header">
          <Typography>Киста яичника - влияние на фертильность</Typography>
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
