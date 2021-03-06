<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:key name="KhachKey" match="KHACH" use="MA_KHACH"/>
    <xsl:template match="/">
        <div>
            <a href="/letan/thuephong.html" class="btn btn-success">Thêm phiếu thuê</a>
            <h2 class="text-center my-2">DANH SÁCH PHIẾU THUÊ PHÒNG</h2>
            <table class="table table-sm table-striped text-center">
                <thead class="thead-dark">
                    <tr>
                        <th>STT</th>
                        <th>Mã phiếu</th>
                        <th>Khách thuê</th>
                        <th>Ngày đến</th>
                        <th>Ngày đi</th>
                        <th>Đã trả phòng</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <xsl:for-each select="QLKS_H2O/PHIEU_THUEPHONG">
                        <xsl:sort select="@DATRAPHONG"/>
                            <tr>
                                <td><xsl:value-of select="position()"/></td>
                                <td><xsl:value-of select="SO_PHIEU"/></td>
                                <td><xsl:value-of select="key('KhachKey', MAKHACH)/HOTEN_KHACH"/></td>
                                <td><xsl:value-of select="NGAYDEN"/></td>
                                <td><xsl:value-of select="NGAYDI"/></td>
                                <xsl:choose>
                                    <xsl:when test="@DATRAPHONG='1'">
                                        <td>Đã trả phòng</td>        
                                    </xsl:when>
                                    <xsl:otherwise>
                                        <td>Chưa trả phòng</td>
                                    </xsl:otherwise>
                                </xsl:choose>
                                <td>
                                    <a class="btn btn-info btn-sm">
                                        <xsl:attribute name="href">/letan/phieuthue.html?idphieu=<xsl:value-of select="SO_PHIEU"/></xsl:attribute>
                                        Xem
                                    </a>
                                    <xsl:if test="@DATRAPHONG='0'">
                                        <a class="btn btn-danger btn-sm ml-1">
                                            <xsl:attribute name="href">/letan/traphong.html?idphieu=<xsl:value-of select="SO_PHIEU"/></xsl:attribute>
                                            Trả phòng
                                        </a>
                                    </xsl:if>
                                </td>
                            </tr>
                    </xsl:for-each>
                </tbody>
            </table>
        </div>
    </xsl:template>
</xsl:stylesheet>