import { useState, useEffect } from "react";
import Table from "./Table";

import { Container, Content, Group, Label, Result, Message } from "./styles";

let ELOS_AND_VALUES = [
  { id: 1, lvl: "4", name: "iron", value: 13.2 },
  { id: 2, lvl: "3", name: "iron", value: 13.2 },
  { id: 3, lvl: "2", name: "iron", value: 13.2 },
  { id: 4, lvl: "1", name: "iron", value: 13.99 },

  { id: 5, lvl: "4", name: "bronze", value: 13.99 },
  { id: 6, lvl: "3", name: "bronze", value: 13.99 },
  { id: 7, lvl: "2", name: "bronze", value: 13.99 },
  { id: 8, lvl: "1", name: "bronze", value: 14.2 },

  { id: 9, lvl: "4", name: "silver", value: 14.2 },
  { id: 10, lvl: "3", name: "silver", value: 14.2 },
  { id: 11, lvl: "2", name: "silver", value: 16.25 },
  { id: 12, lvl: "1", name: "silver", value: 18.5 },

  { id: 13, lvl: "4", name: "gold", value: 23 },
  { id: 14, lvl: "3", name: "gold", value: 26 },
  { id: 15, lvl: "2", name: "gold", value: 27.5 },
  { id: 16, lvl: "1", name: "gold", value: 31 },

  { id: 17, lvl: "4", name: "platinum", value: 32 },
  { id: 18, lvl: "3", name: "platinum", value: 35.5 },
  { id: 19, lvl: "2", name: "platinum", value: 46 },
  { id: 20, lvl: "1", name: "platinum", value: 51.5 },

  { id: 21, lvl: "4", name: "diamond", value: 97 },
  { id: 22, lvl: "3", name: "diamond", value: 115 },
  { id: 23, lvl: "2", name: "diamond", value: 189.99 },
  { id: 24, lvl: "1", name: "diamond", value: 230 },

  { id: 25, lvl: "0", name: "master", value: 398.99 },

  { id: 26, lvl: "0", name: "grandmaster", value: 1150 },

  { id: 27, lvl: "0", name: "challenger", value: 0 }
];

let ELO_WITHOUT_LVL = ELOS_AND_VALUES.filter((elo) => elo.lvl === "0").map(
  (elo) => elo.name
);

let INITIAL_INPUT = {
  currentDivision: null,
  currentElo: null,
  intentDivision: null,
  intentElo: null
};

let INITIAL_AMOUNT = {
  raw: 0.0,
  formated: "$ 0.000"
};

export default function App() {
  const [inputCalc, setInputCalc] = useState(INITIAL_INPUT);

  const [currentRankIndex, setCurrentRankIndex] = useState(-1);
  const [intentRankIndex, setIntentRankIndex] = useState(-1);

  const [elos, setElos] = useState([]);
  const [divisions, setDivisions] = useState([]);

  const [result, setResult] = useState(INITIAL_AMOUNT);

  const [message, setMessage] = useState("");

  useEffect(() => {
    const elosRaw = [...new Set(ELOS_AND_VALUES.map((item) => item.name))];
    const divisionsRaw = [
      ...new Set(ELOS_AND_VALUES.map((item) => item.lvl))
    ].filter((lvl) => lvl !== "0");

    setElos(elosRaw);
    setDivisions(divisionsRaw);
  }, []);

  useEffect(() => {
    let { currentDivision, currentElo, intentDivision, intentElo } = inputCalc;

    if (ELO_WITHOUT_LVL.includes(currentElo)) {
      currentDivision = "0";
    }

    if (ELO_WITHOUT_LVL.includes(intentElo)) {
      intentDivision = "0";
    }

    if (currentElo && currentDivision) {
      const currentRankIndexFound = ELOS_AND_VALUES.findIndex(
        ({ lvl, name }) => lvl === currentDivision && name === currentElo
      );

      setCurrentRankIndex(currentRankIndexFound);
    }

    if (intentElo && intentDivision) {
      const intentRankIndexFound = ELOS_AND_VALUES.findIndex(
        ({ lvl, name }) => lvl === intentDivision && name === intentElo
      );

      setIntentRankIndex(intentRankIndexFound);
    }
  }, [inputCalc]);

  useEffect(() => {
    if (currentRankIndex !== -1 && intentRankIndex !== -1) {
      if (currentRankIndex > intentRankIndex) {
        setMessage("the ranking choosed it's smaller");
        return;
      } else if (currentRankIndex === intentRankIndex) {
        setMessage("the ranking choosed it's the same");
        return;
      } else {
        let amount = 0;
        for (let i = currentRankIndex; i <= intentRankIndex - 1; i++) {
          amount = amount + ELOS_AND_VALUES[i].value;
        }

        const rawResult = amount.toFixed(2);
        const formatedResult = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        }).format(amount);

        setResult({
          raw: rawResult,
          formated: formatedResult
        });

        amount = 0;

        setMessage("");
      }
    }
  }, [currentRankIndex, intentRankIndex]);

  const handleChoose = ({ target }) => {
    const { value, name } = target;
    setInputCalc({ ...inputCalc, [name]: value });
  };

  return (
    <Container>
      <Content>
        <Group>
          <Label>FROM:</Label>
          <select name="currentElo" onChange={handleChoose}>
            <option>current elo</option>

            {elos.map((elo) => (
              <option key={elo}>{elo}</option>
            ))}
          </select>

          {!ELO_WITHOUT_LVL.includes(inputCalc.currentElo) && (
            <select name="currentDivision" onChange={handleChoose}>
              <option>current division</option>

              {divisions.map((division) => (
                <option key={division} value={division}>
                  division {division}
                </option>
              ))}
            </select>
          )}
        </Group>

        <Group>
          <Label>TO:</Label>
          <select name="intentElo" onChange={handleChoose}>
            <option>intent elo</option>

            {elos.map((elo) => (
              <option key={elo}>{elo}</option>
            ))}
          </select>

          {!ELO_WITHOUT_LVL.includes(inputCalc.intentElo) && (
            <select name="intentDivision" onChange={handleChoose}>
              <option>intent division</option>

              {divisions.map((division) => (
                <option key={division} value={division}>
                  division {division}
                </option>
              ))}
            </select>
          )}
        </Group>
      </Content>

      <Message>{message}</Message>

      <Result>
        <p>
          Raw result: {result.raw} <br />
          Formated result: {result.formated}
        </p>
      </Result>

      <Table
        values={ELOS_AND_VALUES}
        currentIndex={currentRankIndex}
        intentIndex={intentRankIndex}
      />
    </Container>
  );
}
