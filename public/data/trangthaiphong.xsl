<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <div>
            <h1 class="text-center my-2">Tình trạng phòng</h1>
            <table class="table table-sm table-striped text-center">
                <thead class="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Phòng</th>
                        <th>Tình trạng phòng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="QLKS_H2O/PHONG">                    
                            <tr>
                              <xsl:attribute name="data-idphong"><xsl:value-of select="MAPHONG"/></xsl:attribute>
                                <td>
                                    <xsl:value-of select="position()"/>
                                </td>
                                <td>
                                    <xsl:value-of select="MAPHONG"/>
                                </td>
                                <td>
                                    <xsl:variable name="matrangthai" select="MA_TRANGTHAI"/>
                                    <select class="form-control form-control-sm w-50 mx-auto">
                                        <xsl:for-each select="//QLKS_H2O/TRANGTHAI_PHONG">
                                            <option>
                                                <xsl:attribute name="value"><xsl:value-of select="MA_TRANGTHAI"/></xsl:attribute>
                                                <xsl:if test="MA_TRANGTHAI=$matrangthai">
                                                    <xsl:attribute name="selected">selected</xsl:attribute>
                                                </xsl:if>
                                                <xsl:value-of select="TEN_TRANGTHAI"/>
                                            </option>
                                        </xsl:for-each>
                                    </select>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-success">Cập nhật</button>
                                </td>
                            </tr>
                        
                    </xsl:for-each>
                </tbody>
            </table>
        </div>
    </xsl:template>

</xsl:stylesheet>