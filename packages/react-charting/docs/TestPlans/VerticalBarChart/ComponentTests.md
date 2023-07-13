**Vertical Bar Chart – Component test plan**

**Sub-components: Bar, Line, Legends, Callout, Labels**

1. **Bar: bar data, bar color (single/multi colors), bar label (show/hide)**
1. **Line: show/hide line, highlight data point on line and show callout**
1. **Legends: show/hide legends, highlight the corresponding bar/line on legend hover**
1. **Callout: Default/custom callout**
1. **Labels: x-Axis labels default/rotated**

|                                 **Test steps**                                  |                                                             **Validation**                                                             | **Tool used** |
| :-----------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------: | :-----------: |
|                           Test 1: [Snapshot testing]                            |                                                                                                                                        |               |
|                - With only data prop, numerical data on x-axis.                 |                                                  Renders vertical bar chart correctly                                                  |    Enzyme     |
|                  - With only data prop, string data on x-axis.                  |                                                  Renders vertical bar chart correctly                                                  |      RTL      |
|                      - With HideLegend prop set to “true”                       |                                                          Should hide legends                                                           |    Enzyme     |
|                      - With HideTooltip prop set to “true”                      |                                                    Should hide the tooltip in chart                                                    |    Enzyme     |
|                  - With EnabledLegendsWrapLines set to “true”                   |               Should enable the legends to wrap lines if there is not enough space to show all legends on a single line                |    Enzyme     |
|                   - With ShowXAxisLablesTooltip set to “true”                   |                                    Should truncate x axis labels and show tooltip on x axis labels                                     |    Enzyme     |
|                      - With WrapXAxisLables set to “true”                       |                                                    Should wrap x axis label values                                                     |    Enzyme     |
|                       - With yAxisTickFormat set to “%d”                        |                                  <p>Should render the y-axis ticks in the format specified</p><p></p>                                  |    Enzyme     |
|                         - With HideLabels set to “true”                         |                                                       Should hide the bar labels                                                       |    Enzyme     |
|                           Test 2: Basic props testing                           |                                                                                                                                        |               |
|                        - HideLegend prop set to “false”                         |                                              Should mount legend when hideLegend is false                                              |    Enzyme     |
|                        - HideTooltip prop set to “false”                        |                                             Should mount callout when hideTootip is false                                              |    Enzyme     |
|                   - onRenderCalloutPerStack prop is not given                   |                                               Should not render onRenderCalloutPerStack                                                |    Enzyme     |
|                     - onRenderCalloutPerDataPoint is given                      |                                               Should render onRenderCalloutPerDataPoint                                                |    Enzyme     |
|                   - onRenderCalloutPerDataPoint is not given                    |                                             Should not render onRenderCalloutPerDataPoint                                              |    Enzyme     |
|                 Test 3: Render calling with respective to props                 |                                                                                                                                        |               |
|  - No prop changes: Mount vertical bar chart and then set the same props again  |                                             Render function should have been called twice                                              |    Enzyme     |
|    - Prop changes: Mount vertical bar chart and then set the some other prop    |                                             Render function should have been called twice                                              |    Enzyme     |
|                              Test 4: Mouse events                               |                                                                                                                                        |               |
|                              - Mouse over on a bar                              |                                              Should render callout correctly on mouseover                                              |    Enzyme     |
|                  - Mouse over on a bar with customized callout                  |                                             Should render customized callout on mouseover                                              |    Enzyme     |
|          Test 5: Render empty chart aria label div when chart is empty          |                                                                                                                                        |               |
|                - Vertical bar chart mounted with non-empty data                 |                                                 No empty chart aria label div rendered                                                 |    Enzyme     |
|                  - Vertical bar chart mounted with empty data                   |                                                  Empty chart aria label div rendered                                                   |    Enzyme     |
|           Test 6: Render empty chart calling with respective to props           |                                                                                                                                        |               |
| - prop changes: Mount vertical bar chart with empty data and then set the props |                                            Render function should have been called 3 times                                             |    Enzyme     |
|                      Test 7: [Sub-Component]: Vertical Bar                      |                                                                                                                                        |               |
|                               - Specify bar width                               |                                               Should render the bar with the given width                                               |      RTL      |
|                         - Specify bar colors (multiple)                         |                                            Should render the bars with the specified colors                                            |      RTL      |
|                  - Specify to use a single color for all bars                   |                                         Should render the bars with the single specified color                                         |      RTL      |
|                              - Hide the bar labels                              |                                               Should render the bars with labels hidden                                                |      RTL      |
|                     - Provide xAxisPadding between the bars                     |                           Should render the bars with the given padding between bar's or lines in the graph                            |      E2E      |
|             - Localize the numbers of the bars with a given culture             |                                 Should render the bars with the numbers localized in the given culture                                 |      E2E      |
|                          Test 8: [Sub-Component]: Line                          |                                                                                                                                        |               |
|                               - Specify line data                               |                                               Should render line with the data provided                                                |      RTL      |
|                       - Hover mouse over the data points                        | Should highlight the data points (No callout is rendered when we hover only on the line. Callout appears on hover over the bars only.) |      RTL      |
|                        Test 9: [Sub-Component]: Legends                         |                                                                                                                                        |               |
|                                 - Hide legends                                  |                                                  Should not show any rendered legends                                                  |      RTL      |
|                         - Hover mouse over bar legends                          |                                  Should reduce the opacity of the other bars/lines and their legends                                   |      RTL      |
|                         - Hover mouse over line legends                         |                                  Should reduce the opacity of the other bars/lines and their legends                                   |      RTL      |
|                        Test 10: [Sub-Component]: Callout                        |                                                                                                                                        |               |
|                            - Hover mouse over a bar                             |                                               Should call the handler on mouse over bar                                                |      RTL      |
|                            - Hover mouse over a bar                             |                                             Should show the default callout over that bar                                              |      RTL      |
|               - Specify custom callout and hover mouse over a bar               |                                              Should show the custom callout over that bar                                              |      RTL      |
|             - Specify custom callout and hover mouse over the line              |            Should not show the custom callout over that line as custom callout is rendered only on mouse over on the bars.             |      RTL      |
|                     Test 11: [Sub-Component]: x-axis labels                     |                                                                                                                                        |               |
|                            - Truncate x-axis labels                             |                                           Should show the x-axis labels tooltip when hovered                                           |      RTL      |
|                             - Rotate x-axis labels                              |                                             Should rotate the x-axis labels by 45 degrees                                              |      RTL      |
|                   Test 12: [Sub-Component]: Screen resolution                   |                                                                                                                                        |               |
|                   - Increase the screen resolution (zoom in)                    |                                                   Should remain unchanged on zoom in                                                   |      RTL      |
|                   - Decrease the screen resolution (zoom out)                   |                                                  Should remain unchanged on zoom out                                                   |      RTL      |
|                      Test 13: Theme changed to Dark Theme                       |                                                      Should reflect theme change                                                       |      RTL      |