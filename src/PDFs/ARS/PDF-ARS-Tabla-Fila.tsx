import React from 'react'; // 👈 Necesario para JSX
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { type TextStyles } from './PDF-ARS';
const styles = StyleSheet.create({
  tableRow: {
    flexDirection: 'row'
  },
  tableCell: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 4,
    paddingVertical: 6,
    alignContent: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    margin: 0.2,
    wordBreak: 'break-word', // Break long words
  }
});

interface PDF_FilasProps {
  rowData: (string | number)[]; // Array of 12 strings, one for each column
  textStyles: TextStyles;
  lastRowStyle: any;
  columnWidths: any;
}

const PDF_Filas: React.FC<PDF_FilasProps> = ({ rowData, textStyles, columnWidths, lastRowStyle }) => {
  const valoresConPeso = ["precioUni", "impuestos", "valorTotal"]
  return (
    <View wrap={false} style={[styles.tableRow, { backgroundColor: '#EDEDED' }, textStyles.tableBody, lastRowStyle]}>
      {rowData.map((cell, idx) => {
        return (
          <View
            key={idx}
            style={[
              styles.tableCell,
              columnWidths[Object.keys(columnWidths)[idx]]
            ]}>{/* Apply dynamic width */}
            {typeof cell === 'number' ? (
              (() => {
                const [integer, decimals] = cell.toLocaleString('es-ES', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).split(',');
                return (
                  <Text>{valoresConPeso.includes(Object.keys(columnWidths)[idx]) && "$   "}{integer},{decimals}</Text>
                );
              })()
            ) : (
              <Text>{cell}</Text>
            )}
          </View>
        )
      })}
    </View>
  )
};

export default PDF_Filas