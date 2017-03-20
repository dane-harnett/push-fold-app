import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import getChart from './helpers/getChart';

const styles = {
  customWidth: {
    width: '30%',
  },
};

const rankIndexMap = ['A','K','Q','J','T','9','8','7','6','5','4','3','2'];
const antes = ['0', '10', '125', '20'];
const positions = ['SB', 'BTN', 'CO', 'HJ', 'BTN3', 'BTN4', 'BTN5', 'BTN6'];
const stackSizes = ['1BB', '2BB', '3BB', '4BB', '5BB', '6BB', '7BB', '8BB', '9BB', '10BB', '11BB', '12BB', '13BB', '14BB', '15BB', '16BB', '17BB', '18BB', '19BB', '20BB'];

class PushFoldScreen extends Component {
  state = {
    antes: 0,
    position: 0,
    stackSize: 19,
  };

  handleChangeAntes = (event, index, antes) => this.setState({antes});
  handleChangePosition = (event, index, position) => this.setState({position});
  handleChangeStackSize = (event, index, stackSize) => this.setState({stackSize});

  render() {
    const chartRows = getChart(antes[this.state.antes], stackSizes[this.state.stackSize], positions[this.state.position]);
    const rows = chartRows.map((row, index) => {
      const cells = row.map((cell) => {
        const className = cell === 1 ? 'push-all-in' : 'fold';
        return (
          <td className={ className }></td>
        );
      });

      return (
        <tr>
          <td>{ rankIndexMap[index] }</td>
          { cells }
        </tr>
      );
    });

    return (
      <div className="push-fold-screen">
        <SelectField
          floatingLabelText="Antes"
          value={this.state.antes}
          onChange={this.handleChangeAntes}
          style={styles.customWidth}
        >
          <MenuItem value={0} primaryText="0%" />
          <MenuItem value={1} primaryText="10%" />
          <MenuItem value={2} primaryText="12.5%" />
          <MenuItem value={3} primaryText="20%" />
        </SelectField>
        <SelectField
          floatingLabelText="Position"
          value={this.state.position}
          onChange={this.handleChangePosition}
          style={styles.customWidth}
        >
          <MenuItem value={0} primaryText="SB" />
          <MenuItem value={1} primaryText="BTN" />
          <MenuItem value={2} primaryText="CO" />
          <MenuItem value={3} primaryText="HJ" />
          <MenuItem value={4} primaryText="BTN3" />
          <MenuItem value={5} primaryText="BTN4" />
          <MenuItem value={6} primaryText="BTN5" />
          <MenuItem value={7} primaryText="BTN6" />
        </SelectField>
        <SelectField
          floatingLabelText="Stack Size"
          value={this.state.stackSize}
          onChange={this.handleChangeStackSize}
          style={styles.customWidth}
        >
          <MenuItem value={19} primaryText="20" />
          <MenuItem value={18} primaryText="19" />
          <MenuItem value={17} primaryText="18" />
          <MenuItem value={16} primaryText="17" />
          <MenuItem value={15} primaryText="16" />
          <MenuItem value={14} primaryText="15" />
          <MenuItem value={13} primaryText="14" />
          <MenuItem value={12} primaryText="13" />
          <MenuItem value={11} primaryText="12" />
          <MenuItem value={10} primaryText="11" />
          <MenuItem value={9} primaryText="10" />
          <MenuItem value={8} primaryText="9" />
          <MenuItem value={7} primaryText="8" />
          <MenuItem value={6} primaryText="7" />
          <MenuItem value={5} primaryText="6" />
          <MenuItem value={4} primaryText="5" />
          <MenuItem value={3} primaryText="4" />
          <MenuItem value={2} primaryText="3" />
          <MenuItem value={1} primaryText="2" />
          <MenuItem value={0} primaryText="1" />
        </SelectField>

        <table border="1" className="hand-chart">
          <tbody>
            <tr>
              <td></td>
              <td>A</td>
              <td>K</td>
              <td>Q</td>
              <td>J</td>
              <td>T</td>
              <td>9</td>
              <td>8</td>
              <td>7</td>
              <td>6</td>
              <td>5</td>
              <td>4</td>
              <td>3</td>
              <td>2</td>
            </tr>
            { rows }
          </tbody>
        </table>
      </div>
    );
  }
}

export default PushFoldScreen;
