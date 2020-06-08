<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema" exclude-result-prefixes="xs" version="2.0">
    <xsl:template match="/">
        <div class="w-50 mx-auto" id="dsdichvu">
            <h3 class="text-center my-2">Danh Sách Dịch Vụ</h3>
            <table class="table table-sm text-center">
                <thead class="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Mã Dịch Vụ</th>
                        <th>Tên Dịch Vụ</th>
                        <th>Giá Dịch Vụ</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="QLKS_H2O/DICHVU">
                        <tr>
                            <td>
                                <xsl:value-of select="position()"/>
                            </td>
                            <td>
                                <xsl:value-of select="MA_DICHVU"/>
                            </td>
                            <td>
                                <input type="text" class="form-control form-control-sm">
                                    <xsl:attribute name="value">
                                        <xsl:value-of select="TEN_DICHVU"/>
                                    </xsl:attribute>
                                </input>
                            </td>
                            <td>
                                <input type="text" class="form-control form-control-sm text-right">
                                    <xsl:attribute name="value">
                                        <xsl:value-of select="GIA_DICHVU"/>
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
