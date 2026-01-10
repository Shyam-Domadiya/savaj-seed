/* eslint-disable jsx-a11y/alt-text */
"use client"

import { Page, Text, View, Document, StyleSheet, Image, Font } from "@react-pdf/renderer"
import { Product } from "@/lib/types/product"

// Register fonts if needed, otherwise use default
Font.register({
    family: 'Helvetica',
    fonts: [
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/1.ttf' },
        { src: 'https://fonts.gstatic.com/s/helveticaneue/v1/2.ttf', fontWeight: 700 },
    ]
})

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        fontSize: 12,
        color: '#333',
    },
    header: {
        marginBottom: 20,
        borderBottomWidth: 2,
        borderBottomColor: '#16a34a', // Primary green
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    brandName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#16a34a',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#111',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 20,
    },
    section: {
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
        color: '#16a34a',
        backgroundColor: '#f0fdf4',
        padding: 5,
    },
    text: {
        lineHeight: 1.5,
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingVertical: 5,
    },
    label: {
        width: '40%',
        fontWeight: 'bold',
        color: '#555',
    },
    value: {
        width: '60%',
    },
    table: {
        marginBottom: 20,
    },
    image: {
        width: '100%',
        height: 200,
        objectFit: 'cover',
        marginBottom: 20,
        borderRadius: 5,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#999',
        fontSize: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
})

interface ProductGuidePDFProps {
    product: Product
}

export const ProductGuidePDF = ({ product }: ProductGuidePDFProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.brandName}>Savaj Seeds</Text>
                <Text style={{ fontSize: 10, color: '#666' }}>Premium Quality Seeds</Text>
            </View>

            {/* Product Title & Image */}
            <Text style={styles.title}>{product.name}</Text>
            <Text style={styles.subtitle}>{product.category} - {product.subcategory}</Text>

            {/* We can't easily use local images in react-pdf client-side without converting to base64 or public URL. 
          Assuming product.images[0].url works if it is a public URL or we skip image if it fails. 
          For now, let's try to render it if it's not a placeholder. */}
            {/* <Image src={product.images[0]?.url} style={styles.image} /> */}

            {/* Description */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Product Description</Text>
                <Text style={styles.text}>{product.longDescription}</Text>
            </View>

            {/* Specifications Table */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Specifications</Text>
                <View style={styles.table}>
                    {product.specifications.slice(0, 6).map((spec) => (
                        <View key={spec.id} style={styles.row}>
                            <Text style={styles.label}>{spec.name}</Text>
                            <Text style={styles.value}>{spec.value}</Text>
                        </View>
                    ))}
                </View>
            </View>

            {/* Growing Guide */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Growing Guide</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Maturity Time</Text>
                    <Text style={styles.value}>{product.maturityTime}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Yield Expectation</Text>
                    <Text style={styles.value}>{product.yieldExpectation}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Difficulty</Text>
                    <Text style={styles.value}>{product.difficultyLevel}</Text>
                </View>
            </View>

            <Text break />

            {/* Instructions */}
            <View style={styles.header}>
                <Text style={styles.brandName}>Savaj Seeds</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Detailed Instructions</Text>

                <Text style={{ ...styles.text, fontWeight: 'bold', marginTop: 10 }}>Planting Instructions:</Text>
                <Text style={styles.text}>{product.plantingInstructions}</Text>

                <Text style={{ ...styles.text, fontWeight: 'bold', marginTop: 10 }}>Care Instructions:</Text>
                <Text style={styles.text}>{product.careInstructions}</Text>

                <Text style={{ ...styles.text, fontWeight: 'bold', marginTop: 10 }}>Harvesting Tips:</Text>
                <Text style={styles.text}>{product.harvestingTips}</Text>

                <Text style={{ ...styles.text, fontWeight: 'bold', marginTop: 10 }}>Storage Guidance:</Text>
                <Text style={styles.text}>{product.storageGuidance}</Text>
            </View>

            <View style={styles.footer}>
                <Text>Thank you for choosing Savaj Seeds. For more information, visit www.savajseeds.com</Text>
                <Text>Contact: +91 123 456 7890 | support@savajseeds.com</Text>
            </View>
        </Page>
    </Document>
)
