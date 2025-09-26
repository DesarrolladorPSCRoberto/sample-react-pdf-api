import React from 'react'
import ReactDOM from 'react-dom';
import ReactPDF, { Document, Page, StyleSheet, View } from '@react-pdf/renderer';
import Header, { type ARSHeaderInfo } from './PDF-ARS-Header'
import Footer, { type totales } from './PDF-ARS-Footer'
import Tabla, { type ARSItem } from './PDF-ARS-Tabla'
//Para react PDF no se puede usar un archivo CSS asi que toca usar esto:
export interface TextStyles {
  titulo: any;
  infoOrdenServicio: any;
  infoTercero: any;
  infoARS: any;
  tableHeader: any;
  tableBody: any;
  normalText: any;
  tituloDisclaimer: any;
}
const backgroundStyles = StyleSheet.create({
  content: {
    backgroundColor: '#ffffff'
  },
  tableHeader: {
    backgroundColor: '#324c68'
  },
  footerInfo: {
    backgroundColor: '#F2F2F2'
  }
});
const textStyles = StyleSheet.create({
  titulo: {
    color: '#324c68',
    fontSize: 10,
    fontWeight: 700,
    marginBottom: 10
  },
  subtitulo: {
    fontSize: 8,
    color: '#697a8d'
  },
  infoOrdenServicio: {
    fontSize: 8,
    color: '#697a8d'
  },
  infoTercero: {
    fontSize: 8,
    color: '#697a8d'
  },
  infoARS: {
    color: '#8594A4'
  },
  tableHeader: {
    fontSize: 8,
    fontWeight: 500,
    color: '#ffffffff'
  },
  tableBody: {
    fontWeight: 450,
    fontSize: 6,
    color: '#697a8d'
  },
  normalText: {
    color: '#697a8d'
  },
  tituloDisclaimer: {
    color: '#0c8ce9'
  }
});
const styles = StyleSheet.create({
  page: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    height: '100%'
  },
  container: {
    backgroundColor: backgroundStyles.content.backgroundColor,
    borderRadius: 3,
    paddingVertical: '10px',
    paddingHorizontal: '20px'
  },
  contentArea: {
    flex: 1, // <-- This pushes the footer to the bottom
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  footerContainer: {
    marginTop: 'auto'
  },
  spacer: {
    width: '100%',
    height: '20px'
  }
});
export interface InfoARS {
  ARSHeaderInfo: ARSHeaderInfo;
  ARSItems: ARSItem[];
}
interface ARSInvoicePDFProps {
  info: InfoARS;
}
const ARSInvoicePDF: React.FC<ARSInvoicePDFProps> = ({ info }) => {

  // Calculate totals
  const { ARSItems } = info;
  const totals: totales = ARSItems.reduce(
    (acc, item) => ({
      subtotal: acc.subtotal + (item.subtotal || 0),
      impuesto: acc.impuesto + (item.impuesto || 0),
      total: acc.total + (item.total || 0),
    }),
    { subtotal: 0, impuesto: 0, total: 0 }
  );
  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Header generalStyles={styles} headerInfo={info.ARSHeaderInfo} backgroundStyles={backgroundStyles} textStyles={textStyles} />
        <View wrap={true} style={[styles.container, {
          flex: 1, // <-- This makes the container take all available space
          display: 'flex',
          flexDirection: 'column',
          paddingHorizontal: '20px',
          paddingVertical: 0
        }]}>
          <View style={styles.contentArea}>
            <Tabla generalStyles={styles} items={info.ARSItems} backgroundStyles={backgroundStyles} textStyles={textStyles} />
            <View style={styles.spacer} fixed></View>
          </View>
          <View wrap={false} style={styles.footerContainer}>
            <Footer
              totales={totals}
              generalStyles={styles}
              backgroundStyles={backgroundStyles}
              textStyles={textStyles}
            />
          </View>
        </View>
      </Page>
    </Document>
  );
};
export default async (data: InfoARS) => {
  // Log the data received

  if (!data || !data.ARSItems || !data.ARSHeaderInfo) {
    throw new Error("Invalid data format");
  }

  // Proceed with PDF creation if the data is valid
  try {
    ReactPDF.render(<ARSInvoicePDF info={data} />, `${__dirname}/example.pdf`);
    const pdfStream = await ReactPDF.renderToStream(<ARSInvoicePDF info={data} />);
    return pdfStream;
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Error generating PDF");
  }
};
