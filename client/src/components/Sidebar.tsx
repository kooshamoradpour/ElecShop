import React, { useState } from "react";

const Sidebar: React.FC = () => {
    const [selectedKeywords, setSelectedKeywords] = useState([]);
    const [keywordInput, setKeywordInput] = useState("");
    const [filters, setFilters] = useState({
        tvs: false,
        freeShipping: false,
        discounts: false,
        color: [],
        size: [],
        priceRange: [],
    });

    const removeKeyword = (keyword: string) => {
        setSelectedKeywords(selectedKeywords.filter((item) => item !== keyword));
    };
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && keywordInput.trim() !== "") {
            setSelectedKeywords([...selectedKeywords, keywordInput.trim()]);
            setKeywordInput(""); // Clear input field
        }
    };

    const toggleFilter = (filterKey: string, value: string | boolean) => {
        setFilters((prevFilters) => {
            if (typeof value === "boolean") {
                return { ...prevFilters, [filterKey]: value };
            }
            const newValues = prevFilters[filterKey as keyof typeof filters] as string[];
            return {
                ...prevFilters,
                [filterKey]: newValues.includes(value)
                    ? newValues.filter((item) => item !== value)
                    : [...newValues, value],
            };
        });
    };

    return (
        <div className="p-3 bg-light border rounded" style={{ width: "250px" }}>
            {/* Keywords Section */}
            <h6>Keywords</h6>
            <div className="mb-3">
                <input
                    type="text"
                    className="input-keywords"
                    placeholder="Search by keyword"
                    value={keywordInput}
                    onChange={(e) => setKeywordInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                ></input>
                {selectedKeywords.map((keyword) => (
                    <span key={keyword} className="badge bg-secondary m-1">
                        {keyword}{" "}
                        <button
                            type="button"
                            className="btn-close btn-close-white"
                            aria-label="Close"
                            onClick={() => removeKeyword(keyword)}
                        ></button>
                    </span>
                ))}
            </div>

            {/* TVs Checkbox */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="tvs"
                    checked={filters.tvs}
                    onChange={() => toggleFilter("tvs", !filters.tvs)}
                />
                <label className="form-check-label" htmlFor="tvs">Tvs</label>
            </div>

            {/* Free Shipping Checkbox */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="freeShipping"
                    checked={filters.freeShipping}
                    onChange={() => toggleFilter("freeShipping", !filters.freeShipping)}
                />
                <label className="form-check-label" htmlFor="freeShipping">
                    Free Shipping
                    <div className="small text-muted">Available for most of our products</div>
                </label>
            </div>

            {/* Discounts Checkbox */}
            <div className="form-check">
                <input
                    type="checkbox"
                    className="form-check-input"
                    id="discounts"
                    checked={filters.discounts}
                    onChange={() => toggleFilter("discounts", !filters.discounts)}
                />
                <label className="form-check-label" htmlFor="discounts">
                    Discounts
                    <div className="small text-muted">Show only products with a discounted price.</div>
                </label>
            </div>

            {/* Price Range */}
            <h6 className="mt-3">Price range</h6>
            <input
                type="range"
                className="form-range"
                min="0"
                max="100"
                value={filters.priceRange[1]}
            />
            <div className="d-flex justify-content-between small">
                <span>$0</span>
                <span>$100{filters.priceRange[1]}</span>
            </div>

            {/* Color Filters */}
            <h6 className="mt-3">Color</h6>
            {["White", "Blue", "Yellow"].map((color) => (
                <div key={color} className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={color}
                        onChange={() => toggleFilter("color", color)}
                    />
                    <label className="form-check-label" htmlFor={color}>{color}</label>
                </div>
            ))}

            {/* Size Filters */}
            <h6 className="mt-3">Size</h6>
            {["75”", "50”", "32”"].map((size) => (
                <div key={size} className="form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id={size}
                        onChange={() => toggleFilter("size", size)}
                    />
                    <label className="form-check-label" htmlFor={size}>{size}</label>
                </div>
            ))}
        </div>
    );
};

export default Sidebar;
