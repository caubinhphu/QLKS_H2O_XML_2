<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    <xsl:key name="LoaiPhongKey" match="LOAIPHONG" use="MA_LOAIPHONG"/>
    <xsl:key name="TrangThaiPhongKey" match="TRANGTHAI_PHONG" use="MA_TRANGTHAI"/>
    
    <xsl:template match="/">
        <div>
            <h1 class="text-center my-4">Danh sách phòng</h1>
            
            <div class="d-flex mx-md-4" id="dsphong">
                <div class="d-flex justify-content-around flex-wrap my-4">
                    <xsl:for-each select="QLKS_H2O/PHONG">
                        <div class="phong" data-toggle="modal">
                            <div class="d-flex justify-content-center align-items-center phong-loaiphong">
                                <xsl:attribute name="style">
                                    background-color: <xsl:value-of select="key('LoaiPhongKey', MA_LOAIPHONG)/MAMAU"/>
                                </xsl:attribute>
                                <p class="phong-text"><xsl:value-of select="MAPHONG"/></p>
                            </div>
                            <div class="phong-trangthai">
                                <xsl:attribute name="style">
                                    background-color: <xsl:value-of select="key('TrangThaiPhongKey', MA_TRANGTHAI)/MAMAU"/>
                                </xsl:attribute>
                                .
                            </div>
                        </div>
                    </xsl:for-each>
                </div>
            </div>
            <hr/>
            <div class="d-flex m-4 justify-content-around flex-wrap">
                <div>
                    <div class="text-center">
                        <b style="font-size: 20px">Loại phòng</b>
                    </div>
                    <div class="my-2">
                        <xsl:for-each select="QLKS_H2O/LOAIPHONG">
                            <div class="d-flex align-items-center my-2">
                                <div class="mr-2">
                                    <div class="chuthich-loaiphong">
                                        <xsl:attribute name="style">
                                            background-color: <xsl:value-of select="MAMAU"/>
                                        </xsl:attribute>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <p class="my-auto">
                                        <xsl:value-of select="TEN_LOAIPHONG"/>
                                    </p>
                                </div>
                            </div>
                        </xsl:for-each>
                    </div>
                </div>
            </div>
            <div class="d-flex m-4 justify-content-around flex-wrap">
                <div>
                    <div class="text-center">
                        <b style="font-size: 20px">Loại phòng</b>
                    </div>
                    <div class="my-2">
                        <xsl:for-each select="QLKS_H2O/LOAIPHONG">
                            <div class="d-flex align-items-center my-2">
                                <div class="mr-2">
                                    <div class="chuthich-loaiphong">
                                        <xsl:attribute name="style">
                                            background-color: <xsl:value-of select="MAMAU"/>
                                        </xsl:attribute>
                                    </div>
                                </div>
                                <div class="d-flex align-items-center">
                                    <p class="my-auto">
                                        <xsl:value-of select="TEN_LOAIPHONG"/>
                                    </p>
                                </div>
                            </div>
                        </xsl:for-each>
                    </div>
                </div>
            </div>
        </div>
    </xsl:template>
</xsl:stylesheet>