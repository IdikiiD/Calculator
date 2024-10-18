const AppButton = ({ onClick, buttons }) => {
    const buttonRows = [
        ["C", "←", "÷"],
        ["7", "8", "9", "×"],
        ["4", "5", "6", "−"],
        ["1", "2", "3", "+"],
        ["0", "="]
    ];

    return (
        <div className="buttons">
            {buttonRows.map((row, rowIndex) => (
                <div key={rowIndex} className="calc-button-row">
                    {row.map((button) => (
                        <button
                            key={button}
                            onClick={() => onClick(button)}
                            className={`calc-button ${button === "0" ? "double" : ""}`}
                        >
                            {button}
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default AppButton;
