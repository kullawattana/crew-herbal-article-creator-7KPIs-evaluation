# Automated Score Calculator - User Guide

## Overview

This tool automatically calculates scores from Multi-Agent system log files, evaluating 4 key dimensions:

1. **Robustness** - Data completeness
2. **Clarity** - Hallucination detection
3. **Efficacy** - Market relevance
4. **Feasibility** - Implementation viability

---

## Required Files

You need to prepare **4 files** in total:

| File | Description | Example |
|------|-------------|---------|
| **Task 11** | Master Fact Sheet — consolidated data from all tasks | `task_11_*.txt` |
| **Task 13** | Final Article — complete herbal medicine article | `task_13_*.txt` |
| **Task 14** | Data Integrity Report | `task_14_*.txt` |
| **Task 15** | Strategy Report | `task_15_*.txt` |

---

## How to Use

### Step 1: Open the HTML File
1. Double-click `score_calculator.html`
2. It will open in your web browser

### Step 2: Upload Files
1. Click each upload area
2. Select the file matching that task
3. Once all 4 files are uploaded, the "Calculate & Save Scores" button becomes available

### Step 3: Fill in Article Info (Optional)
- **Herb Name** — e.g., Ginger, Turmeric, Garlic
- **Article Title** — to identify the run being recorded

### Step 4: Calculate Scores
1. Click "Calculate & Save Scores"
2. Wait a moment for processing
3. Results will be displayed and **automatically saved to history**

---

## Interpreting Scores

### Score Ranges per Dimension

#### 1. Robustness (Data Completeness)
- **100%** = All data used
- **95%** = Some important data missing
- **90%** = Multiple data gaps
- **<80%** = Too much data missing

#### 2. Clarity (Hallucination)
- **100%** = No hallucinations
- **90%** = Minor hallucinated content
- **<70%** = Significant hallucinations

#### 3. Efficacy (Effectiveness)
- **100%** = Fully reflects market trends
- **95%** = Covers major trends
- **85%** = Moderately covered
- **<70%** = Misses key trends

#### 4. Feasibility (Viability)
- **100%** = Complete data, clear plan
- **85%** = Full safety, partial compliance
- **70%** = Partial safety coverage
- **<60%** = Critical safety gaps

---

## Decision Criteria

### GO (Ready to publish)
- Robustness ≥ 90%
- Clarity = 100% (no hallucinations)
- Efficacy ≥ 85%
- Feasibility ≥ 75%

### CONDITIONAL GO (Needs revision)
- Some scores below GO threshold but not at NO-GO level
- Issues must be resolved before publishing

### NO-GO (Do not publish)
- Clarity < 100% (hallucinations present)
- Robustness < 80% (too much missing data)
- Feasibility < 60% (critical safety gaps)
- Efficacy < 70% (not market-relevant)

---

## History Database

Every calculation is **automatically saved** to browser localStorage.

### History Table
Columns: Date/Time, Herb Name, Article Title, 4 KPI scores, Decision

### Export CSV
- Click **Export CSV** to download all records as a `.csv` file
- Thai language supported in Excel (BOM encoding)
- Filename: `llm_scores_YYYY-MM-DD.csv`

### Clear History
- Click **Clear History** and confirm to delete all records

> **Note:** Data is stored in the browser's localStorage. Opening in a different browser or incognito mode will not show previous history.

---

## Detail Views

The system also shows additional information:

### Dropped Entities
- Items present in the Master Fact Sheet but missing from the article
- **Note:** "Not Found" values are not counted as dropped

### Hallucinated Entities
- Items present in the article but absent from the Master Fact Sheet
- **Important:** Any hallucination may trigger an immediate NO-GO

---

## Example Output

```
Robustness: 95%
Clarity: 100%
Efficacy: 95%
Feasibility: 85%

Decision: GO ✅
All scores pass the threshold. Ready to publish.
```

---

## Tips

1. **Verify files before uploading**
   - Make sure each file matches the correct Task number
   - Files must be `.txt` format

2. **Interpreting Dropped Entities**
   - If the source value is "Not Found" — not a fault
   - Only data that exists in source but is missing from the article counts as a problem

3. **Hallucination = Critical Issue**
   - Even a single hallucinated item may result in NO-GO
   - Review the Hallucinated Entities list carefully

4. **Partial Satisfaction in Feasibility**
   - Some dependencies may not be 100% complete
   - e.g., partial compliance data = 40%

---

## Troubleshooting

### Calculate button not working
- **Fix:** Make sure all 4 files have been uploaded

### Incorrect scores
- **Fix:** Verify that the file format matches what the system expects

### Dropped Entities not showing
- **Fix:** Check that Task 14 contains a "Dropped Entities" section

---

## Additional Documentation

- `audit_logic_flowchart.docx` - System audit logic and flowchart
- `automated_evaluation_protocol.docx` - Detailed calculation methodology
- `evaluation_protocol_interactive.html` - Interactive calculation example

---

## Support

If you encounter issues or have questions, please refer to the Logic documentation.

---

**Version:** 2.0
**Last updated:** March 17, 2026

### Changelog
- **v2.0** - Added history database (localStorage), CSV export, herb name and article title fields
- **v1.0** - 4 KPI score calculation with Go/No-Go decision
