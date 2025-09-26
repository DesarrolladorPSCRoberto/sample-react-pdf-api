import React from 'react'; // 👈 Necesario para JSX
import { Text, View, StyleSheet } from '@react-pdf/renderer';
const styles = StyleSheet.create({
  totalSection: {
    textAlign: 'right',
    fontSize: 8,
    fontWeight: 'bold',
    width: '220px',
    alignSelf: 'flex-end',
    borderRadius: 3,
    padding: 4
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: 8,
    marginRight: 0,
    padding: 5,
  },
  label: {
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    minWidth: '100px', // Ensures values align
  },
  currency: {
    fontWeight: 'normal',
    marginRight: 2,
    width: 12, // Fixed width for $
    textAlign: 'right',
  },
  value: {
    fontWeight: 'normal',
    textAlign: 'right',
  },
});
interface BackgroundStyles {
  content: any;
  tableHeader: any;
  footerInfo: any;
}

interface TextStyles {
  titulo: any;
  infoOrdenServicio: any;
  infoTercero: any;
  infoARS: any;
  tableHeader: any;
  normalText: any;
  tituloDisclaimer: any;
}

interface PDF_TotalesProps {
  backgroundStyles: BackgroundStyles;
  textStyles: TextStyles;
  generalStyles: any;
  Subtotal: number;
  IVA: number;
  TotalARS: number;
}

const PDF_Totales: React.FC<PDF_TotalesProps> = ({ backgroundStyles, textStyles, Subtotal, IVA, TotalARS }) => (
  <View style={[styles.totalSection, backgroundStyles.footerInfo, textStyles.infoOrdenServicio]}>
    <View style={[styles.totalRow]}>
      <Text style={[styles.label]}>Subtotal ARS:</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value]}>{"$   "}{typeof Subtotal === 'number' ? Subtotal.toLocaleString('es-ES') : Subtotal}</Text>
      </View>
    </View>
    <View style={[styles.totalRow]}>
      <Text style={[styles.label]}>IVA:</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value]}>{"$   "}{typeof IVA === 'number' ? IVA.toLocaleString('es-ES') : IVA}</Text>
      </View>
    </View>
    <View style={[styles.totalRow]}>
      <Text style={[styles.label]}>Total ARS:</Text>
      <View style={styles.valueContainer}>
        <Text style={[styles.value]}>{"$   "}{typeof TotalARS === 'number' ? TotalARS.toLocaleString('es-ES') : TotalARS}</Text>
      </View>
    </View>
  </View>
);

export default PDF_Totales