<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:template match="/">
        <div>
            <h1 class="text-center my-2">DANH SÁCH HÓA ĐƠN</h1>
            <table class="table table-sm">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Mã phiếu</th>
                        <th>Ngày đến</th>
                        <th>Ngày đi</th>
                        <th>Tổng tiền phòng</th>
                        <th>Tổng tiền dịch vụ</th>
                        <th>Tổng tiền</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:variable name="stt" select="1"/>
                    <xsl:for-each select="QLKS_H2O/PHIEU_THUEPHONG">
                        <xsl:if test="@DATRAPHONG=1">
                            
                            <xsl:variable name="tienPhong" select="."/>
                            <xsl:variable name="tienDichVu" select="."/>
                            <tr>
                                <td><xsl:value-of select="$stt"/></td>
                                <td><xsl:value-of select="SO_PHIEU"/></td>
                                <td><xsl:value-of select="NGAYDEN"/></td>
                                <td><xsl:value-of select="NGAYDI"/></td>
                                <td><xsl:value-of select="$tienPhong"/></td>
                                <td><xsl:value-of select="$tienDichVu"/></td>
                                <td><xsl:value-of select="$tienPhong + $tienDichVu"/></td>
                            </tr>
                        </xsl:if>
                    </xsl:for-each>
                </tbody>
            </table>
        </div>
    </xsl:template>
</xsl:stylesheet>