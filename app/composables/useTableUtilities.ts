import jsPDF from 'jspdf'
// composables/useTableUtilities.ts
import { ref } from 'vue'
import * as XLSX from 'xlsx'
import 'jspdf-autotable'

export interface ExportColumn {
  field: string
  header: string
  formatter?: (value: any) => string
}

export interface ExportOptions {
  filename?: string
  title?: string
  columns: ExportColumn[]
  data: any[]
}

export function useTableUtilities() {
  const showExportMenu = ref(false)

  // Format currency for Indonesian Rupiah
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
    }).format(amount)
  }

  // Format number for Indonesian locale
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID').format(num)
  }

  // Toggle export menu
  const toggleExportMenu = () => {
    showExportMenu.value = !showExportMenu.value
  }

  // Close export menu
  const closeExportMenu = () => {
    showExportMenu.value = false
  }

  // Export data to Excel
  const exportToExcel = (options: ExportOptions) => {
    try {
      const filename = options.filename || 'export'

      // Prepare data with formatted values
      const exportData = options.data.map((row) => {
        const formattedRow: any = {}
        options.columns.forEach((col) => {
          const value = row[col.field]
          formattedRow[col.header] = col.formatter
            ? col.formatter(value)
            : value
        })
        return formattedRow
      })

      // Create workbook and worksheet
      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()

      // Add title if provided
      if (options.title) {
        XLSX.utils.sheet_add_aoa(ws, [[options.title]], { origin: 'A1' })
        XLSX.utils.sheet_add_json(ws, exportData, {
          origin: 'A3',
          skipHeader: false,
        })
      }

      XLSX.utils.book_append_sheet(wb, ws, 'Data')

      // Save file
      XLSX.writeFile(wb, `${filename}.xlsx`)
      closeExportMenu()
    }
    catch (error) {
      console.error('Error exporting to Excel:', error)
      throw new Error('Failed to export to Excel')
    }
  }

  // Export data to CSV
  const exportToCSV = (options: ExportOptions) => {
    try {
      const filename = options.filename || 'export'

      // Prepare CSV content
      const headers = options.columns.map(col => col.header).join(',')
      const rows = options.data.map((row) => {
        return options.columns.map((col) => {
          const value = row[col.field]
          const formattedValue = col.formatter
            ? col.formatter(value)
            : value

          // Escape commas and quotes in CSV
          const stringValue = String(formattedValue || '')
          if (stringValue.includes(',') || stringValue.includes('"')) {
            return `"${stringValue.replace(/"/g, '""')}"`
          }
          return stringValue
        }).join(',')
      })

      const csvContent = [headers, ...rows].join('\n')

      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      const url = URL.createObjectURL(blob)

      link.setAttribute('href', url)
      link.setAttribute('download', `${filename}.csv`)
      link.style.visibility = 'hidden'

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      closeExportMenu()
    }
    catch (error) {
      console.error('Error exporting to CSV:', error)
      throw new Error('Failed to export to CSV')
    }
  }

  // Export data to PDF
  const exportToPDF = (options: ExportOptions) => {
    try {
      const filename = options.filename || 'export'

      // Create new PDF document
      const doc = new jsPDF()

      // Add title if provided
      if (options.title) {
        doc.setFontSize(16)
        doc.text(options.title, 14, 15)
      }

      // Prepare table data
      const headers = options.columns.map(col => col.header)
      const rows = options.data.map((row) => {
        return options.columns.map((col) => {
          const value = row[col.field]
          return col.formatter
            ? col.formatter(value)
            : String(value || '')
        })
      })

      // Add table to PDF
      ;(doc as any).autoTable({
        head: [headers],
        body: rows,
        startY: options.title ? 25 : 15,
        styles: {
          fontSize: 8,
          cellPadding: 2,
        },
        headStyles: {
          fillColor: [239, 68, 68], // Red background for headers
          textColor: 255,
        },
        alternateRowStyles: {
          fillColor: [245, 245, 245],
        },
      })

      // Save PDF
      doc.save(`${filename}.pdf`)
      closeExportMenu()
    }
    catch (error) {
      console.error('Error exporting to PDF:', error)
      throw new Error('Failed to export to PDF')
    }
  }

  // Print table
  const printTable = (elementSelector: string = '.p-datatable', title?: string) => {
    try {
      const printContent = document.querySelector(elementSelector)
      if (!printContent) {
        throw new Error('Table element not found')
      }

      const originalTitle = document.title
      if (title) {
        document.title = title
      }

      // Hide action buttons for printing
      const actionButtons = printContent.querySelectorAll('button, .p-button')
      actionButtons.forEach((btn) => {
        ;(btn as HTMLElement).style.display = 'none'
      })

      // Trigger print
      window.print()

      // Restore button visibility after print
      setTimeout(() => {
        actionButtons.forEach((btn) => {
          ;(btn as HTMLElement).style.display = ''
        })
        document.title = originalTitle
      }, 100)
    }
    catch (error) {
      console.error('Error printing table:', error)
      throw new Error('Failed to print table')
    }
  }

  // Export data based on type
  const exportData = (type: 'excel' | 'pdf' | 'csv', options: ExportOptions) => {
    switch (type) {
      case 'excel':
        exportToExcel(options)
        break
      case 'pdf':
        exportToPDF(options)
        break
      case 'csv':
        exportToCSV(options)
        break
      default:
        throw new Error('Unsupported export type')
    }
  }

  // Get standard denom export columns
  const getDenomExportColumns = (): ExportColumn[] => [
    { field: 'amd_type', header: 'Voucher Type' },
    { field: 'amd_denom', header: 'Nominal Amount', formatter: formatCurrency },
    { field: 'amd_flag_user', header: 'Flag User' },
    { field: 'amd_cost', header: 'Cost', formatter: formatNumber },
    { field: 'amd_printing_cost', header: 'Printing Cost', formatter: formatNumber },
    { field: 'amd_price', header: 'Price', formatter: formatNumber },
    {
      field: 'amd_is_active',
      header: 'Status',
      formatter: (value: number) => value ? 'Active' : 'Inactive',
    },
  ]

  return {
    // State
    showExportMenu,

    // Methods
    toggleExportMenu,
    closeExportMenu,
    exportData,
    exportToExcel,
    exportToCSV,
    exportToPDF,
    printTable,

    // Formatters
    formatCurrency,
    formatNumber,

    // Preset columns
    getDenomExportColumns,
  }
}
