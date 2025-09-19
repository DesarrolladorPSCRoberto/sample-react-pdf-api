import React from 'react'; // 👈 Necesario para JSX
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import Totales from './PDF-ARS-Totales'

const styles = StyleSheet.create({
  footer: {
    fontSize: 8,
    textAlign: 'left',
    marginBottom: 20
  },
  signAreaRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginRight: 60,
    height: 70,
    marginTop: 1
  },
  signArea: {
    height: '100%',
    width: '200px',
    display: 'flex',
    padding: 10,
    alignSelf: 'flex-start',
    textAlign: 'left',
    justifyContent: 'flex-end',
    borderRadius: 3,
    marginRight: 1
  },
  disclaimer: {
    borderLeft: '2px solid #0c8ce9',
    marginTop: '20px',
    padding: '5px'
  }
});
interface BackgroundStyles {
  content: any;
  tableHeader: any;
  footerInfo: any;
}

export interface totales {
  subtotal: number;
  impuesto: number;
  total: number;
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

interface PDF_FooterProps {
  totales: totales;
  backgroundStyles: BackgroundStyles;
  generalStyles: any;
  textStyles: TextStyles
}
const PDF_Footer: React.FC<PDF_FooterProps> = ({ totales, backgroundStyles, textStyles, generalStyles }) => (
  <View wrap={false} style={[styles.footer, backgroundStyles.content]}>
    <View style={[{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }]}>
      <View style={[{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginRight: 60 }]}>
        <View style={[styles.signAreaRow]}>
          <View style={[styles.signArea, backgroundStyles.footerInfo, textStyles.infoOrdenServicio]}>
            <Text>Elaborado por: </Text>
          </View>

          <View style={[styles.signArea, backgroundStyles.footerInfo, textStyles.infoOrdenServicio]}>
            <Text>Revisado por: </Text>
          </View>

          <View style={[styles.signArea, backgroundStyles.footerInfo, textStyles.infoOrdenServicio]}>
            <Text>Aprobado por: </Text>
          </View>
        </View>
        <View style={[styles.signAreaRow]}>
          <View style={[styles.signArea, backgroundStyles.footerInfo, textStyles.infoOrdenServicio]}>
            <Text>Aprobado por: </Text>
          </View>

          <View style={[styles.signArea, backgroundStyles.footerInfo, textStyles.infoOrdenServicio]}>
            <Text>Aprobado por: </Text>
          </View>

          <View style={[styles.signArea, backgroundStyles.footerInfo, textStyles.infoOrdenServicio]}>
            <Text>Aprobado por: </Text>
          </View>
        </View>
      </View>

      <Totales Subtotal={totales.subtotal}
        IVA={totales.impuesto}
        TotalARS={totales.total} backgroundStyles={backgroundStyles} textStyles={textStyles} generalStyles={generalStyles} />
    </View>
    <View style={[textStyles.normalText, styles.disclaimer]}>
      <Text>Con la firma de este documento se deja constancia de que los servicios relacionados han sido recibidos a entera satisfacción.</Text>
    </View>
  </View>
);

export default PDF_Footer