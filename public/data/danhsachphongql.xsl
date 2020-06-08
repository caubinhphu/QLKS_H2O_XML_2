<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        <div class="w-50 mx-auto" id="dsphong">
            <h3 class="text-center my-2">Danh Sách Phòng</h3>
            <table class="table table-sm text-center">
                <thead class="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Mã Phòng</th>
                        <th>Loại phòng</th>
                        <th>Giá Phòng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="QLKS_H2O/PHONG">                    
                        <tr>
                            <td>
                                <xsl:value-of select="position()"/>
                            </td>
                            <td><xsl:value-of select="MAPHONG"/></td>
                            <td>
                                <xsl:variable name="MaLP" select="MA_LOAIPHONG"/>
                                <select class="form-control form-control-sm">
                                    <xsl:for-each select="//QLKS_H2O/LOAIPHONG">
                                        <option>
                                            <xsl:attribute name="value"><xsl:value-of select="MA_LOAIPHONG"/></xsl:attribute>
                                            <xsl:if test="MA_LOAIPHONG=$MaLP">
                                                <xsl:attribute name="selected">selected</xsl:attribute>
                                            </xsl:if>
                                            <xsl:value-of select="TEN_LOAIPHONG"/>
                                        </option>
                                    </xsl:for-each>
                                </select>
                            </td>
                            <td>
                                <input type="text" class="form-control form-control-sm text-right">
                                    <xsl:attribute name="value">
                                        <xsl:value-of select="GIAPHONG"/>
                                    </xsl:attribute>
                                </input>
                            </td>
                              <td>
                                  <button class="btn btn-success btn-sm">Cập nhật</button>
                              </td>
                            </tr>
                     </xsl:for-each>
                </tbody>
            </table>
        </div>
    </xsl:template>
</xsl:stylesheet>
