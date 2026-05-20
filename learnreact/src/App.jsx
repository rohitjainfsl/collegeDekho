import { useState } from "react";

function App() {
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [result, setResult] = useState("");
  const [operation, setOperation] = useState("");

  function operate() {
    switch (operation) {
      case "+":
        setResult(Number(input1) + Number(input2));
        break;
      case "-":
        setResult(input1 - input2);
        break;
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter first number"
        value={input1}
        onChange={(e) => setInput1(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter second number"
        value={input2}
        onChange={(e) => setInput2(e.target.value)}
      />
      <select
        name=""
        id=""
        value={operation}
        onChange={(e) => setOperation(e.target.value)}
        onBlur={operate}
      >
        <option value="">Select</option>
        <option value="+">+</option>
        <option value="-">-</option>
        <option value="/">/</option>
        <option value="*">*</option>
        <option value="%">%</option>
      </select>
      <h3>{result}</h3>
    </>
  );
}
export default App;