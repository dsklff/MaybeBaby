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
import "../styles/common-styles.css";
import "../styles/AccordeonContainer.css";
import { useNavigate } from "react-router-dom";

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
  let navigate = useNavigate();

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div className="app-container accordeon">
      <div className="title-wrapper">
        <button
          className="arrow-btn"
          onClick={() => navigate("/starttest", { replace: true })}
        >
          <img src={ArrowIcon} alt="arrow" />
        </button>
        <h1 className="app-title">Справочник</h1>
      </div>
      <Accordion onChange={handleChange("panel1")}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Что такое репродуктивный возраст?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Репродуктивный возраст определяет способность женщины к зачатию и
            рождению ребёнка. Репродуктивная функция не выключается «вдруг», а
            угасает постепенно. Неспособность к зачатию наступает гораздо раньше
            менопаузы - ещё до того, как полностью «закончились» яйцеклетки.
            Репродуктивным считается возраст до 49 лет. Но, с учетом современных
            обстоятельств жизни (стресс, плохая экология, аборты, воспалительные
            процессы малого таза и т.д.), уверенно ориентироваться на эту цифру
            не стоит. «Паспортный» возраст является основной причиной снижения
            репродуктивной функции. Сокращение яйцеклеток начинается с рождения,
            но после 35 лет этот процесс ускоряется в несколько раз.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
      >
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>Что такое овариальный резерв?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Овариальный резерв (врачи так же говорят яичниковый резерв,
            фолликулярный резерв) – совокупность всех фолликулов (яйцеклеток)
            женщины, или еще можно сказать потенциал яичников к производству
            яйцеклеток сейчас и в будущем. Овариальный резерв закладывается у
            каждой женщины еще до рождения, а размер резерва предопределяется
            генетически. Он даётся единожды и на всю жизнь. Его невозможно
            увеличить. Он истощается год за годом. Когда количество фолликулов
            достигает критической точки, наступает менопауза. Это естественный
            процесс.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel3"}
        onChange={handleChange("panel3")}
      >
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Как оценить свой овариальный резерв?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Оценка овариального резерва включает: - Менструальный цикл
            (регулярные или нет стали более скудными, сократился промежуток
            между месячными) - УЗИ. При ультразвуковом исследовании врач
            подсчитывает количество фолликулов. - Лабораторные анализы. Из
            лабораторных признаков чаще всего используется ФСГ
            (фолликулостимулирующий гормон) и АМГ (антимюллеров гормон).
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel4"}
        onChange={handleChange("panel4")}
      >
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography>Как влияет индекс массы тела на фертильность?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Дефицит массы тела у женщины, планирующей зачатие, может
            неблагоприятно сказаться на общем состоянии репродуктивной системы.
            Дело в том, что при недостаточном весе происходят нарушения женской
            фертильности, так как при сокращении жировой прослойки происходит
            сбой в ритме овуляции. То есть, в организме женщины наблюдается
            пониженный уровень эстрогенов, что часто становится причиной
            бесплодия. Резкая потеря веса может также привести к нарушениям
            цикла менструации. Если у женщины наблюдается избыточный вес,
            зачатие может быть также затруднено. Ожирение часто сопровождается
            развитием инсулинорезистентности, что приводит к гормональным сбоям
            в женском организме. Само собой, любые гормональные нарушения могут
            негативно сказаться на репродуктивной функции.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel5"}
        onChange={handleChange("panel5")}
      >
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography>Как влияет курение на фертильность?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Пары, которые хотят ребенка, должны знать, что курение снижает
            вероятность зачатия и отрицательно влияет на развитие будущего
            ребенка после беременности. Влияние курения на женское
            репродуктивное здоровье Исследования однозначно выявили вредное
            воздействие курения на яичники. Степень повреждения прямо
            пропорциональна продолжительности курения. Такие вещества, как
            никотин и кадмий, содержащиеся в сигаретном табаке, уменьшают
            высвобождение эстрогена, женского гормона, из клеток яичников. Опять
            же, известно, что эти вещества повышают восприимчивость к
            генетическим аномалиям яйцеклеток. В результате курения происходит
            быстрая потеря женских яйцеклеток, хранящихся в яичниках, и
            возникает риск ранней менопаузы. Исследования показали, что курение
            снижает вероятность зачатия и увеличивает риск выкидыша во время
            беременности. Влияние курения на мужское репродуктивное здоровье
            Мужчины, которые выкуривают более 1 пачки в день, имеют проблемы с
            подвижностью и формой сперматозоидов. Так же, нахождение в среде
            курильщиков увеличивает этот риск.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel6"}
        onChange={handleChange("panel6")}
      >
        <AccordionSummary aria-controls="panel6d-content" id="panel6d-header">
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
        expanded={expanded === "panel7"}
        onChange={handleChange("panel7")}
      >
        <AccordionSummary aria-controls="panel7d-content" id="panel7d-header">
          <Typography>Что такое АМГ и за что он отвечает</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            АМГ (анитимюллеров гормон) — это гормон, который вырабатывают сообща
            все фолликулы, которые есть у женщины в настоящий момент. У молодых
            здоровых женщин - он высокий. АМГ уменьшается с возрастом и у
            молодых женщин при истощении овариального резерва. ФСГ
            (фолликулостимулирующий гормон) производится гипофизом и его
            количество напрямую зависит от овариального резерва женщины.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
